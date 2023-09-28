# Crevice Api
Api适配器，为了处理工程中API需要开启P2P模式，保证切换P2P模式和http模式的行为一致。

# Install

```powershell
npm install --save crevice-api
```

# Instance - 实例化使用

```javascript
import axios from 'axios'
import CreviceApi from 'crevice-api'
import apiList from './apiList' // 接口列表

export default new CreviceApi({
  host: 'http://192.168.1.1:9001',
  list: apiList,
  request: payload => axios(payload), // 请求模块
  // 代理自动切换（会在发送前监听，例如心跳）
  requestProxy(request) {
    if (!(response.status > 400 && response.status <= 599)) return request
    // 或心跳接口
    return payload => axios(payload) // 代理接口
  },
  sendSuccess(response) {
    // ... 处理不同接口模块返回报文，根据业务统一格式
    return {
      ...response
    }
  },
  sendFail() {
    // ... 处理不同接口模块返回报文，根据业务统一格式
    return {
      ...response
    }
  }
})
```

## API List - 定义接口列表

./apiList.ts

```javascript
export default [
  {
    name: 'getUser',
    method: 'GET',
    path: '/get/user/@{{id}}',
  }
]
```

## API Use - 接口使用
任意http请求方法默认使用JSON对象，除了FormData，File, Array, ArrayBuffer，Blob等对象

```javascript
api.getUser({ id: 0 })
  .then((response) => {
    
  })
  .catch(() => {

  })
```

## Axios装饰类
crevice-api用来模拟Axios常用调用方式，可能不会支持所有的用法，仅为了代码无缝切换而制作。

```javascript
import axios from 'axios'
import CreviceApi, { AxiosDecorator } from 'crevice-api'

const api = new AxiosDecorator(new CreviceApi({
  host: 'http://192.168.1.1:9001',
  list: apiList,
  request: payload => axios(payload), // 请求模块
  requestProxy(request) {
    // ...
  },
}))

const newApiInstace = api.create({
  host: '..'
  ...
})

// 注册时以路径最后一个名称作为内部的api名称
api.post('xxx/xxxx/xxx', { id: 0 })
api.get(`xxx/xxx/xxxx/?id=${0}`)
api.put(...)
api.patch(...)
api.delete(...)

export default {
  getUser({ id }) {
    api.get(`xxx/xxx/xxxx/?id=${0}`)
  }
}
```

## Extentions - 拓展

### 实例化参数

```typescript
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
    rejectSend?: Function // 拒绝发送的条件
    requestModule: Function // 设置请求模块
    requestProxy?: Function // 请求代理
    responseEncoding?: string // 响应编码
    responseType?: string // 响应类型
    sendBefore?: Function // 发送前
    sendFail?: Function // 发送失败
    sendSuccess?: Function // 发送成功
    timeout?: number // 超时时间（毫秒）
    verifyParams?: boolean // 是否需要参数映射
}
```

### 接口参数详细配置

```typescript
interface ApiParamMap {
    aliasName?: string
    dataType?: string
    default?: string
    dispensable?: boolean
    emptyValueReturnNull?: boolean
    name: string
}

interface ApiDefine {
    fake?: { [key: string]: any } | Function
    method: string
    name: string
    paramMap?: Array<string | ApiParamMap> 
    path: string
}

// 实际例子
{
  name: 'getUser',
  // ...
  // paramsMap只有verifyParams为true时且参数为JSON对象时强行验证
  paramsMap: [
    // 接口参数 1
    'servename', // 预定义servename，所有参数配置均按实例化时默认配置
    // 接口参数2，提供更多默认处理能力
    {
      aliasName: 'id', // 别名
      dataType: 'number', // 自动转换数据类型
      default: null, // 当接口数据未设置改值时的默认值
      dispensable: true, 
      emptyValueReturnNull: false, // 为true时，包含default值在内，所有空值都会返回null
      name: 'pid', // 接口参数实际名称
      type: 'query', // 设置为path参数，会替换占位符@{{id}}，缺省则按http协议方法存取
    }
  ]
}
```

## 实战演示
```typescript
// 假axios
const axios = (payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let query = Object.entries(payload.params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')

        if (query.length > 0) query = '?' + query

        xhr.open(payload.method, payload.url + query, true);
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.response)
                console.log('请求成功', responseData);
            } else {
                reject({ status: xhr.status })
                console.log('请求失败', xhr.status);
            }
        };

        xhr.onerror = function(e) {
            reject(e)

            throw e
        };

        xhr.send();
    })
}

const { AxiosDecorator, CreviceApi } = window

const  api = new CreviceApi({
    host: 'https://api.openweathermap.org',
    request: payload => axios(payload),
    requestProxy(request) {
        if (true) return request
        return payload => axios(payload)
    },
    sendSuccess(response) {
        console.log(response)
        return response
    },
    sendFail(error) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject({
                    error,
                    content: 'Alter Error Content'
                })
            }, 2000);
        })
    },
    list: [
        {
            name: 'weatherCall',
            method: 'GET',
            path: '/data/3.0/onecall',
            paramMap: [
                'lat',
                'lon',
                'exclude',
                'appid'
            ]
        }
    ],
})

api.weatherCall({
    lat: 22.5431,
    lon: 114.0579,
    appid: 'cc0eb5e33785704759399aec22517bbc',
}).then(response => {
    console.log(response)
}).catch(e => {
    console.log(e)
})
```

