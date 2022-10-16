import axios from 'axios';
import AbortController from 'abort-controller/dist/abort-controller.mjs';
import FormDataNode from 'form-data';
import { def, is } from './common';

export default class AxiosInterlayer {
  constructor(options = {}) {
    return this.init(options);
  }

  init({
    host,
    proxy,
    sendee,
    rejectSend,
    paramsSetDefault,
    paramsSetDefaultValue,
    needParamMap,
    processHeaders,
    onBuildPayloadBefore,
    onBuildPayloadAfter,
    responseType,
    responseEncoding,
    onUploadProgress,
    onDownloadProgress,
    onExtractPayload,
    sendBefore,
    sendSuccess,
    sendFail,
    timeout,
    isFake,
    fakeCallBack,
    fakeDelay,
    list,
  }) {
    // 基础属性
    this.host = def(host, '');
    this.list = def(list, []);
    this.sendee = def(sendee, null);
    this.paramsSetDefault = def(paramsSetDefault, true);
    this.paramsSetDefaultValue = def(paramsSetDefaultValue, '');
    this.needParamMap = def(needParamMap, true);
    this.responseType = def(responseType, 'json');
    this.responseEncoding = def(responseEncoding, 'utf8');
    this.timeout = def(timeout, 0);
    this.proxy = def(proxy, null);

    // 回调事件
    this.onBuildPayloadBefore = def(onBuildPayloadBefore, params => params);
    this.onBuildPayloadAfter = def(onBuildPayloadAfter, params => params);
    this.sendBefore = def(sendBefore, params => params);
    this.sendSuccess = def(sendSuccess, params => params);
    this.sendFail = def(sendFail, params => params);
    this.setHeader = def(processHeaders, params => params);
    this.onUploadProgress = def(onUploadProgress, null);
    this.onDownloadProgress = def(onDownloadProgress, null);
    this.onExtractPayload = def(onExtractPayload, params => params);
    this.rejectSend = def(rejectSend, () => false);

    // 模拟数据设置
    this.isFake = def(isFake, false);
    this.fakeCallBack = def(fakeCallBack, params => params);
    this.fakeDelay = def(fakeDelay, 80);

    return this.register();
  }

  // 自动选择content-type
  autoContentType(data) {
    if (is(data, typeof window === 'undefined' ? FormDataNode : FormData)) return 'multipart/form-data';
    if (is(data, Array)) return 'application/json';
    if (is(data, 'object')) return 'application/json';
    if (is(data, 'string')) return 'text/plain';

    return 'text/plain';
  }

  // 注册
  register() {
    const { list } = this;
    const apiMap = {};

    list.forEach(item => {
      if (this[item.name]) {
        console.error(`[mecha-axios]: 接口${item.name}的命名发生冲突，请修改该名称`);

        return item;
      }

      apiMap[item.name] = this.buildRequest(item);
    });

    return apiMap;
  }

  // 构建接口
  buildRequest(item) {
    const {
      sendee,
      isFake,
      fakeDelay,
      fakeCallBack,
      timeout,
      responseType,
      responseEncoding,
      onUploadProgress,
      onDownloadProgress,
      onExtractPayload,
      rejectSend,
      proxy,
    } = this;
    const { name, method, path, fake, paramMap } = item;
    const apiRequest = payload => {
      const abort = new AbortController();
      const space = { abort };

      payload.signal = abort.signal;

      // 依据条件拒绝发送
      if (rejectSend(payload)) {
          return Promise.reject(new Error('Reject Api Send'));
      }

      // 是否使用虚假数据
      if (!is(fake, null) && !is(fake, 'undefined') && isFake) {
        return new Promise(resolve => {
          setTimeout(() => resolve(fakeCallBack(
            // 当fake是函数时，执行fake并返回报文（哪怕报文本身就是函数也在函数内返回）
            is(fake, 'function') ? fake(payload) : fake, { name, ...item })),
            fakeDelay);
        })
          .then(response => this.sendSuccess(response))
          .catch(error => Promise.reject(this.sendFail(error)));
      }

      // 是否替换发送对象, 否则默认使用axios
      if (!sendee) {
        axios.$space = space;

        return axios(payload)
          .then(response => this.sendSuccess(response))
          .catch(error => Promise.reject(this.sendFail(error)));
      }

      if (!is(sendee, 'promise') && !is(sendee, 'function')) {
        throw '[mecha-axios]: sendee参数需为promise类型或function类型';
      }

      if (is(sendee, 'promise')) {
        sendee.$space = space;

        return sendee(payload)
          .then(response => this.sendSuccess(response))
          .catch(error => Promise.reject(this.sendFail(error)));
      }

      if (is(sendee, 'function')) {
        sendee.$space = space;

        return sendee(payload, {
          sendSuccess: (...args) => this.sendSuccess.apply(this, args),
          sendFail: (...args) => this.sendFail.apply(this, args),
          space,
        });
      }
    }

    return async (data, options = {}) => {
      const { query, body, pathParam } = options;
      const payload = await this.rebuildPayload({
        name,
        path,
        method,
        pathParam,
        paramMap,
        query,
        body,
        data: onExtractPayload(data),
      });

      // 公共上传进度
      if (is(onUploadProgress, 'function')) {
        payload.onUploadProgress = onUploadProgress;
      }

      // 公共下载进度
      if (is(onDownloadProgress, 'function')) {
        payload.onDownloadProgress = onUploadProgress;
      }

      // 公共接口代理
      if (is(proxy, 'object')) {
        payload.proxy = proxy;
      }

      return apiRequest({
        ...payload,

        responseType,
        responseEncoding,
        timeout,

        ...options,
      });
    };
  }

  // 构建API方法
  async rebuildPayload({
    name,
    path,
    pathParam,
    paramMap,
    method,
    query,
    body,
    data
  }) {
    const { host, needParamMap } = this;
    const ContentType = this.autoContentType(data);
    const paramMapJson = {};
    let headers = this.setHeader({ 'Content-Type': ContentType });
    let payloadData = data;
    let nextPath = path;

    if (is(headers, 'promise')) headers = await headers;

    // 当payloadData为object且needParamMap为true时
    if (needParamMap && is(paramMap, 'undefined') && is(payloadData, 'object')) {
      throw `[mecha-axios]: 接口${name}需预定义接口参数（在接口配置中设置paramMap参数）`;
    }

    payloadData = this.onBuildPayloadBefore(payloadData);

    if (is(payloadData, 'promise')) payloadData = await payloadData;

    // 处理请求报文
    payloadData = this.resetPayloadData(payloadData, paramMap);
    payloadData = this.onBuildPayloadAfter(payloadData);

    // 参数描述
    paramMap.forEach(param => {
      if (is(param, 'object')) {
        paramMapJson[param.name] = param;
      } else {
        paramMapJson[param] = { name: param };
      }
    })

    if (is(payloadData, 'promise')) payloadData = await payloadData;

    // 需支持String、FormData
    let sendBody = payloadData;
    let sendQuery = payloadData;

    // 数组类型
    if (is(payloadData, 'array')) {
      sendQuery = [...payloadData];
      sendBody = [...payloadData];

      // 依据协议方法选择报文通道
      if (!['GET', 'PUT', 'DELETE'].includes(method)) sendQuery = [];
      if (!['POST'].includes(method)) sendBody = [];
    }

    // 对象类型
    if (is(payloadData, File)) {
      sendBody = payloadData;
      sendQuery = {};
    } else if (is(payloadData, 'object')) {
      sendQuery = { ...payloadData };
      sendBody = { ...payloadData };

      // 依据协议方法选择报文通道
      if (!['GET', 'PUT', 'DELETE'].includes(method)) sendQuery = {};
      if (!['POST'].includes(method)) sendBody = {};

      // 参数描述（优先级较低）
      Object.entries(payloadData).forEach(([key, v]) => {
        const param = paramMapJson[key];

        if (is(param, 'object') && param.type === 'body') {
          sendBody[key] = v;

          delete sendQuery[key];
        }

        if (is(param, 'object') && param.type === 'query') {
          sendQuery[key] = v;

          delete sendBody[key];
        }
      });

      // 路径参数（restful）
      if (is(pathParam, 'array')) {
        pathParam.forEach(key => {
          nextPath = nextPath.replace(new RegExp(`:\\$\\{${key}\\}`, 'g'), data[key]);

          delete sendBody[key];
          delete sendQuery[key];
        });
      }

      // 声明传query参数
      if (is(query, 'array')) {
        query.forEach(key => {
          sendQuery[key] = payloadData[key];

          delete sendBody[key];
        });
      }

      // 声明添加body参数
      if (is(body, 'array')) {
        body.forEach(key => {
          sendBody[key] = payloadData[key];

          delete sendQuery[key];
        });
      }
    }

    let requestParams = {
      url: host + nextPath,
      method,
      headers,
    };

    if (!is(sendQuery, 'undefined')) requestParams.params = sendQuery;
    if (!is(sendBody, 'undefined')) requestParams.data = sendBody;

    requestParams = this.sendBefore(requestParams);

    if (is(requestParams, 'promise')) requestParams = await requestParams;

    return requestParams;
  }

  // 处理payload
  resetPayloadData(data, paramMap = []) {
    const { paramsSetDefault, paramsSetDefaultValue } = this;
    const nextData = {};

    if (is(data, File)) return data;

    // 当报文参数为undefined且paramMap被定义内容时
    if (paramsSetDefault && is(data, 'undefined') && is(paramMap, 'array') && paramMap.length > 0) {
      paramMap.forEach(param => {
        if (is(param, 'object')) {
          nextData[param.name] = param.default || paramsSetDefaultValue;

          return param;
        }

        nextData[param] = paramsSetDefaultValue;
      });

      return nextData;
    }

    if (!is(data, 'object') || !is(paramMap, 'array')) return data;

    // data为object时
    paramMap.forEach(param => {
      if (!is(param, 'object')) {
        if (paramsSetDefault && is(data[param], 'undefined')) {
          nextData[param] = paramsSetDefaultValue;
        } else if (!is(data[param], 'undefined')) {
          nextData[param] = data[param];
        }

        return param;
      }

      // 存在别名时，从别名中取值，否在在原名中取值，都不存在值时从默认值从取值
      nextData[param.name] = data[param.aliasName] || data[param.name] || param.default;
    });

    return nextData;
  }
}