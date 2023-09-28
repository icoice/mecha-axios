import AbortController from 'abort-controller';

import {
    dateFormat,
    def,
    is,
    timestamp,
    today,
} from './tools';

interface ApiParamMap {
    name: string
    aliasName?: string
    dataType?: string
    default?: string
    emptyValueReturnNull?: boolean
    dispensable?: boolean
}

interface ApiDefine {
    name: string
    method: string
    path: string
    paramMap?: Array<string | ApiParamMap> 
    fake?: {
        [key: string]: any
    } | Function
}

interface ApiOptions {
    body?: any
    pathParam?: any
    query?: any
}

interface InitOptions {
    fakeCallBack?: Function // 假数据报文返回处理
    fakeDelay?: number // 假数据延迟接收时间（毫秒）
    host: string // 服务域名
    isFake?: boolean // 开启假数据
    list?: Array<ApiDefine | void> // 接口定义
    onBuildPayloadAfter?: Function // 创建报文后
    onBuildPayloadBefore?: Function // 创建报文前
    onDownloadProgress?: Function // 获得下载进度
    onExtractPayload?: Function // 报文处理完成后
    onUploadProgress?: Function // 获得上传进度
    paramsSetDefault?: boolean // 是否开启请求参数默认值
    paramsSetDefaultValue?: any // 设置请求参数默认值
    processHeaders?: Function // 处理参数头
    proxy?: boolean // 是否开启代理
    rejectSend?: Function // 拒绝发送的条件
    request: Function // 设置请求模块
    requestProxy?: Function // 请求代理
    responseEncoding?: string // 响应编码
    responseType?: string // 响应类型
    sendBefore?: Function // 发送前
    sendFail?: Function // 发送失败
    sendSuccess?: Function // 发送成功
    timeout?: number // 超时时间（毫秒）
    verifyParams?: boolean // 是否需要参数映射
}

export default class CreviceApi {
    private fakeCallBack: Function
    private fakeDelay: number
    private host: string
    private isFake: boolean
    private list: Array<ApiDefine>
    private onBuildPayloadAfter: Function
    private onBuildPayloadBefore: Function
    private onDownloadProgress: Function
    private onExtractPayload: Function
    private onUploadProgress: Function 
    private paramsSetDefault: boolean
    private paramsSetDefaultValue: any
    private proxy: boolean
    private rejectSend: Function
    private requestMoudle: Function
    private requestProxy: Function
    private responseEncoding: string
    private responseType: string 
    private sendBefore: Function
    private sendFail: Function
    private sendSuccess: Function
    private setHeader: Function
    private timeout: number
    private verifyParams: boolean

    constructor(options: InitOptions) {
        this.init(options)
    }

    init({
        fakeCallBack,
        fakeDelay,
        host,
        isFake,
        list,
        onBuildPayloadAfter,
        onBuildPayloadBefore,
        onDownloadProgress,
        onExtractPayload,
        onUploadProgress,
        paramsSetDefault,
        paramsSetDefaultValue,
        processHeaders,
        proxy,
        rejectSend,
        request,
        requestProxy,
        responseEncoding,
        responseType,
        sendBefore,
        sendFail,
        sendSuccess,
        timeout,
        verifyParams,
    }: InitOptions) {

        // 基础属性
        this.host = def(host, '');
        this.list = def(list, []);
        this.verifyParams = def(verifyParams, true);
        this.paramsSetDefault = def(paramsSetDefault, true);
        this.paramsSetDefaultValue = def(paramsSetDefaultValue, '');
        this.proxy = def(proxy, null);
        this.responseEncoding = def(responseEncoding, 'utf8');
        this.responseType = def(responseType, 'json');
        this.requestMoudle = def(request, null);
        this.requestProxy = def(requestProxy, () => this.requestMoudle);
        this.timeout = def(timeout, 0);

        // 回调事件
        this.onBuildPayloadAfter = def(onBuildPayloadAfter, params => params);
        this.onBuildPayloadBefore = def(onBuildPayloadBefore, params => params);
        this.onDownloadProgress = def(onDownloadProgress, null);
        this.onExtractPayload = def(onExtractPayload, params => params);
        this.onUploadProgress = def(onUploadProgress, null);
        this.rejectSend = def(rejectSend, () => false);
        this.sendBefore = def(sendBefore, params => params);
        this.sendFail = def(sendFail, params => params);
        this.sendSuccess = def(sendSuccess, params => params);
        this.setHeader = def(processHeaders, params => params);

        // 模拟数据设置
        this.fakeCallBack = def(fakeCallBack, params => params);
        this.fakeDelay = def(fakeDelay, 80);
        this.isFake = def(isFake, false);

        // 输出API
        this.register();
    }

  // 构建接口
    async buildRequest(item: ApiDefine) {
        const {
            fakeCallBack,
            fakeDelay,
            isFake,
            onDownloadProgress,
            onExtractPayload,
            onUploadProgress,
            proxy,
            rejectSend,
            responseEncoding,
            responseType,
            requestProxy,
            timeout,
        } = this;

        let { requestMoudle } = this

        const {
            fake,
            method,
            name,
            paramMap,
            path,
        } = item;

        const apiRequest = async (payload: any = {}) => {
            const abort = new AbortController();
            
            payload.signal = { abort };

            // 依据条件拒绝发送
            if (rejectSend(payload, abort.signal)) {
                return Promise.reject(new Error('Reject Api Send'));
            }

            // 是否使用虚假数据, 当fake是函数时，执行fake并返回报文（哪怕报文本身就是函数也在函数内返回）
            if (!is(fake, null) && !is(fake, 'undefined') && isFake) {
                return new Promise(resolve => {
                        setTimeout(async () => {
                            const data = fake instanceof Function ? await fake(payload) : fake

                            resolve(await fakeCallBack(data, { ...item }))
                        }, fakeDelay);
                    })
                    .then(async (...args: any) => await this.sendSuccess.apply(this, args))
                    .catch(async (...args: any) => Promise.reject(await this.sendFail.apply(this, args) || new Error('request fail')))
            }

            // 是否替换发送对象
            if (!is(requestMoudle, 'function')) throw '[crevice-api]: sendee参数需function类型';


            // 前置判断是否需要切换代理
            requestMoudle = await requestProxy(requestMoudle)

            // 发送请求
            let result: any = requestMoudle(payload)

            if (!(result instanceof Promise)) return result

            result = await result
                .then(async (...args: any) => await this.sendSuccess.apply(this, args))
                .catch(async (...args: any) => Promise.reject(await this.sendFail.apply(this, args) || new Error('request fail')))

            return result
        }

        return async (data: any, options: ApiOptions = {}) => {
            const { query, body, pathParam } = options;

            const payload = await this.buildPayload({
                body,
                data: onExtractPayload(data),
                method,
                name,
                paramMap,
                path,
                pathParam,
                query,
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

    // 自动选择content-type
    autoContentType(data) {
        if (is(data, 'object')) return 'application/json';
        if (is(data, 'string')) return 'text/plain';
        if (is(data, Array)) return 'application/json';
        if (is(data, FormData)) return 'multipart/form-data';

        return 'text/plain';
    }

    // 注册
    async register() {
        const { list } = this;

        list.forEach((item: ApiDefine) => {
            if (item.name in this) {
                console.warn(`[crevice-api]: 接口${item.name}的命名发生冲突，请修改该名称`);

                return item;
            }

            this[item.name] = async (data: any, options: ApiOptions) => {
                const apiCall = await this.buildRequest(item);

                if (!(item.name in this)) this[item.name] = apiCall

                return apiCall(data, options)
            }
        });
    }

  // 构建API方法
  async buildPayload({
    body,
    data,
    method,
    name,
    paramMap,
    path,
    pathParam,
    query,
  }) {
        const { host, verifyParams } = this;
        const paramMapJson = {};
        const ContentType = this.autoContentType(data);
        const headers = await this.setHeader({ 'Content-Type': ContentType });
        let payloadData = data;
        let nextPath = path;

        if (verifyParams && is(paramMap, 'undefined') && is(payloadData, 'object')) {
            throw `[crevice-api]: 接口${name}需预定义接口参数（非必要则将needParamMap设置为false）`;
        }

        // 处理请求报文
        payloadData = await this.onBuildPayloadBefore(payloadData);
        payloadData = this.buildPayloadData(payloadData, paramMap);
        payloadData = await this.onBuildPayloadAfter(payloadData);

        // 参数描述
        if (is(paramMap, Array)) {
            paramMap.forEach((param: any) => {
                if (is(param, 'object')) {
                    paramMapJson[param.name] = param;
                } else {
                    paramMapJson[param] = { name: param };
                }
            })
        }

        const supportQueryParams = ['GET', 'DELETE', 'OPTIONS ', 'HEAD ']
        const supportQueryAndBodyParams = ['POST', 'PUT', 'PATCH']
        const defaultUseParamsType = supportQueryParams.includes(method) ? 'query' : 'body'
        let sendData = { query: {}, body: {} }
        let isSkip = false

        // GET方法，参数为文件，表单
        if ((
            is(payloadData, File) ||
            is(payloadData, FormData)) && defaultUseParamsType === 'query') {
            throw '请求报文为二进制文件，协议方法需支持body参数'
        }

        // GET方法，参数为数组
        if ((
            is(payloadData, Array) || 
            is(payloadData, null)) && defaultUseParamsType === 'query') {
            sendData.query = JSON.stringify(payloadData);
            isSkip = true
        }

        // POST方法
        if ((
            is(payloadData, Array) ||
            is(payloadData, File) ||
            is(payloadData, FormData) ||
            is(payloadData, ArrayBuffer) ||
            is(payloadData, Blob)) && defaultUseParamsType === 'body') {
            sendData.body = payloadData;
            isSkip = true
        }

        // JSON对象类型
        if (is(payloadData, 'object') && !isSkip) {
            // 通过paramsMap设置默认值
            Object.keys(payloadData).forEach((key: string) => {
                const v = payloadData[key];
                const param = paramMapJson[key];
                const paramType = param ? (param.type || defaultUseParamsType) : defaultUseParamsType

                if (paramType === 'body') sendData.body[key] = v;
                if (paramType === 'query') sendData.query[key] = v;
                if (paramType === 'path') nextPath = nextPath.replace(new RegExp(`@\\{\\{${key}\\}\\}`, 'g'), payloadData[key]);
            });
        }

        // 额外参数设置
        if (is(pathParam, 'object')) {
            Object.keys(pathParam).forEach((key: string) => {
                nextPath = nextPath = nextPath.replace(new RegExp(`@\\{\\{${key}\\}\\}`, 'g'), pathParam[key]);
            });
        }

        if (is(query, 'object')) {
            Object.keys(query).forEach(key => {
                sendData.query[key] = query[key];
            });
        }

        if (is(body, 'object')) {
            Object.keys(body).forEach(key => {
                sendData.body[key] = body[key];
            });
        }
        
        const requestData: any = {}

        if (Object.keys(sendData.body).length > 0) requestData.data = sendData.body
        if (Object.keys(sendData.query).length > 0) requestData.params = sendData.query

        return await this.sendBefore({
            headers,
            method,
            url: host + nextPath,
            ...requestData,
        });
    }

  // 处理payload, 类型转换
  buildPayloadData(data: any = {}, paramMap: Array<ApiParamMap | string>) {
    if (!is(data, 'object') ||
        is(paramMap, 'undefined') ||
        is(data, File) ||
        is(data, FormData) ||
        is(data, Array)  ||
        is(data, ArrayBuffer) ||
        is(data, Blob)) return data;

    const { paramsSetDefault, paramsSetDefaultValue } = this;

    const needChagneTypes = [
        'todayStart',
        'todayEnd',
        'todayStartTimestamp',
        'todayEndTimestamp'
    ];

    const canNotChagneTypes = [null, '', undefined];
    const nextData = {};

    const changeDataType = (param: ApiParamMap) => {
        switch (param.dataType) {
            // 数字
            case 'number': 
                nextData[param.name] = Number(nextData[param.name]);
                break;
            // 字符
            case 'string':
                nextData[param.name] = String(nextData[param.name]);
                break;
            // 时间戳
            case 'timestamp':
                nextData[param.name] = timestamp(new Date(nextData[param.name]));
                break;
            // 日期
            case 'date':
                nextData[param.name] = dateFormat(nextData[param.name]);
                break;
            // 开始日期
            case 'todayStart':
                nextData[param.name] = today('start');
                break;
            // 开始日期时间戳
            case 'todayStartTimestamp':
                nextData[param.name] = timestamp(today('start'));
                break;
            // 结束日期
            case 'todayEnd':
                nextData[param.name] = today('end');
                break;
            // 结束日期时间戳
            case 'todayEndTimestamp':
                nextData[param.name] = timestamp(today('end'));
                break;
            default:
        }
    }

    // 当报文参数为undefined且paramMap被定义内容时
    if (paramsSetDefault && is(data, 'undefined') && is(paramMap, 'array') && paramMap.length > 0) {
      paramMap.forEach((param: ApiParamMap | string) => {
        const dataType: string = param instanceof Object && is(param, 'object') ? (param.dataType || '') : ''

        // 数据类型转换
        if (param instanceof Object && is(param, 'object')) {
            nextData[param.name] = !is(param.default, 'undefined') ? param.default : paramsSetDefaultValue;

            if (!canNotChagneTypes.includes(nextData[param.name]) || needChagneTypes.includes(dataType)) {
                changeDataType(param);
            }

            return param;
        }

        if (typeof param === 'string') {
            nextData[param] = paramsSetDefaultValue;
        }
      });

      return nextData;
    }

    // data为object时
    paramMap.forEach((param: ApiParamMap | string) => {
        // param为字符串时, 字符串类型不存在别名
        if (typeof param === 'string') {
            if (paramsSetDefault && is(data[param], 'undefined')) {
                nextData[param] = paramsSetDefaultValue;
            } else if (!is(data[param], 'undefined')) {
                nextData[param] = data[param];
            }

            return param;
        }

        const aliasName: string = param.aliasName || ''
        const dataType: string = param.dataType || ''

        // 存在别名时，从别名中取值，否则在原名中取值，都不存在值时从默认值从取值
        if (!is(data[aliasName], 'undefined')) {
            nextData[param.name] = data[aliasName]; // 别名
        } else if (!is(data[param.name], 'undefined')) {
            nextData[param.name] = data[param.name]; // 有值时
        } else {
            nextData[param.name] = param.default || paramsSetDefaultValue; // 设置缺省值
        }

        // 转换数据类型
        if (!canNotChagneTypes.includes(nextData[param.name]) || needChagneTypes.includes(dataType)) {
            changeDataType(param);
        }

        // 单个字段，假设值为空时，空值要求为null, 而非空字符时的处理
        // 这里主要处理关联字段置空时，需为null的场合
        if ([paramsSetDefaultValue, '', undefined].includes(nextData[param.name]) && param.emptyValueReturnNull) {
            nextData[param.name] = null;
        }

        // 省略非必要上传字段
        if ([paramsSetDefaultValue, '', undefined, null].includes(nextData[param.name]) && param.dispensable) {
            delete nextData[param.name];
        }
    });

    return nextData;
  }
}