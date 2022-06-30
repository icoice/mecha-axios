const MechaAxios = require('../lib').default;

const api = new MechaAxios({
  host: 'http://api.icoice.net',
  isFake: false,
  fakeDelay: 50,
  paramsSetDefault: false,
  paramsSetDefaultValue: null,
  processHeaders(header) {
    console.log('processHeaders:', header);
    return header;
  },
  onBuildPayloadBefore(payload) {
    console.log('onBuildPayloadBefore:', payload);
    return payload; 
  },
  onBuildPayloadAfter(payload) {
    console.log('onBuildPayloadAfter:', payload);
    return payload; 
  },
  sendBefore(payload) {
    return new Promise(resolve => {
      console.log('sendBefore:', payload);
      setTimeout(() => {
        console.log('sendBefore async complate');
        resolve(payload);
      }, 2000);
    })
  },
  // 当sendSuccess发生错误(执行throw)时，会执行sendFail，在接口方法中使用时，直接跳到catch处理
  sendSuccess(response) {
    // 这种处理可以整体处理服务器抛出的异常
    if (response.code !== 200) {
      throw `[${response.code}]：${response.message}`;
    }

    console.log('sendSuccess:', response);

    return response;
  },
  // 发生网络错误，接口错误，sendSuccess抛出异常时，执行这里的处理
  // （当sendee不是一个promise对象时，该逻辑不生效）
  sendFail(error) {
    console.log('sendFail:', error);
    return error;
  },
  list: [
    {
      name: 'getUser',
      method: 'GET',
      path: '/get/user',
      paramMap: [
        'accessToken',
        {
          name: 'userId',
          aliasName: 'id',
          default: 'icoice'
        },
      ],
      fake: {
        code: 200,
        message: 'success',
        data: {},
      },
    },
    {
      name: 'getUserId',
      method: 'GET',
      path: '/get/user/:${id}',
      paramMap: ['id'],
    },
    {
      name: 'getUserDetail',
      method: 'POST',
      path: '/get/user/:${id}/detail/:${type}',
      paramMap: ['id', 'type', 'date'],
      fake: {
        code: 500,
        message: 'fail',
        data: {},
      },
    },
    {
      name: 'getUserAge',
      method: 'GET',
      path: '/get/user/age',
      paramMap: ['accessToken'],
      fake: {
        code: 200,
        message: 'success',
        data: {},
      },
    },
    {
      name: 'getUserPower',
      method: 'GET',
      path: '/get/power',
      fake: {
        code: 200,
        message: 'success',
        data: {},
      },
    },
  ],
});

api.getUser({ userId: 7649 });
api.getUser({ id: 7649 });
console.log('---------- \n');
api.getUserId({ id: '7649' }, { pathParam: ['id'] });
console.log('---------- \n');
api.getUserId({ id: '7649' }, { pathParam: ['id'], query: ['id'], body: ['id'] });
console.log('---------- \n');
api.getUserPower();
console.log('---------- \n');
api.getUserAge();
console.log('---------- \n');
api.getUserDetail({ id: '7649', type: 'trace', date: Date.now() }, { pathParam: ['id', 'type'] });
console.log('---------- \n');
