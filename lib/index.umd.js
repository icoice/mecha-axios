(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 917:
/***/ ((module) => {

/*globals self, window */


/*eslint-disable @mysticatea/prettier */
var _ref = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : /* otherwise */undefined,
  AbortController = _ref.AbortController,
  AbortSignal = _ref.AbortSignal;
/*eslint-enable @mysticatea/prettier */

module.exports = AbortController;
module.exports.AbortSignal = AbortSignal;
module.exports["default"] = AbortController;

/***/ }),

/***/ 217:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
var AxiosDecorator = /** @class */ (function () {
    function AxiosDecorator() {
    }
    return AxiosDecorator;
}());
exports["default"] = AxiosDecorator;


/***/ }),

/***/ 778:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var abort_controller_1 = __webpack_require__(917);
var tools_1 = __webpack_require__(594);
var CreviceApi = /** @class */ (function () {
    function CreviceApi(options) {
        this.init(options);
    }
    CreviceApi.prototype.init = function (_a) {
        var _this = this;
        var fakeCallBack = _a.fakeCallBack, fakeDelay = _a.fakeDelay, host = _a.host, isFake = _a.isFake, list = _a.list, onBuildPayloadAfter = _a.onBuildPayloadAfter, onBuildPayloadBefore = _a.onBuildPayloadBefore, onDownloadProgress = _a.onDownloadProgress, onExtractPayload = _a.onExtractPayload, onUploadProgress = _a.onUploadProgress, paramsSetDefault = _a.paramsSetDefault, paramsSetDefaultValue = _a.paramsSetDefaultValue, processHeaders = _a.processHeaders, proxy = _a.proxy, rejectSend = _a.rejectSend, request = _a.request, requestProxy = _a.requestProxy, responseEncoding = _a.responseEncoding, responseType = _a.responseType, sendBefore = _a.sendBefore, sendFail = _a.sendFail, sendSuccess = _a.sendSuccess, timeout = _a.timeout, verifyParams = _a.verifyParams;
        // 基础属性
        this.host = (0, tools_1.def)(host, '');
        this.list = (0, tools_1.def)(list, []);
        this.verifyParams = (0, tools_1.def)(verifyParams, true);
        this.paramsSetDefault = (0, tools_1.def)(paramsSetDefault, true);
        this.paramsSetDefaultValue = (0, tools_1.def)(paramsSetDefaultValue, '');
        this.proxy = (0, tools_1.def)(proxy, null);
        this.responseEncoding = (0, tools_1.def)(responseEncoding, 'utf8');
        this.responseType = (0, tools_1.def)(responseType, 'json');
        this.requestMoudle = (0, tools_1.def)(request, null);
        this.requestProxy = (0, tools_1.def)(requestProxy, function () { return _this.requestMoudle; });
        this.timeout = (0, tools_1.def)(timeout, 0);
        // 回调事件
        this.onBuildPayloadAfter = (0, tools_1.def)(onBuildPayloadAfter, function (params) { return params; });
        this.onBuildPayloadBefore = (0, tools_1.def)(onBuildPayloadBefore, function (params) { return params; });
        this.onDownloadProgress = (0, tools_1.def)(onDownloadProgress, null);
        this.onExtractPayload = (0, tools_1.def)(onExtractPayload, function (params) { return params; });
        this.onUploadProgress = (0, tools_1.def)(onUploadProgress, null);
        this.rejectSend = (0, tools_1.def)(rejectSend, function () { return false; });
        this.sendBefore = (0, tools_1.def)(sendBefore, function (params) { return params; });
        this.sendFail = (0, tools_1.def)(sendFail, function (params) { return params; });
        this.sendSuccess = (0, tools_1.def)(sendSuccess, function (params) { return params; });
        this.setHeader = (0, tools_1.def)(processHeaders, function (params) { return params; });
        // 模拟数据设置
        this.fakeCallBack = (0, tools_1.def)(fakeCallBack, function (params) { return params; });
        this.fakeDelay = (0, tools_1.def)(fakeDelay, 80);
        this.isFake = (0, tools_1.def)(isFake, false);
        // 输出API
        this.register();
    };
    // 构建接口
    CreviceApi.prototype.buildRequest = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fakeCallBack, fakeDelay, isFake, onDownloadProgress, onExtractPayload, onUploadProgress, proxy, rejectSend, responseEncoding, responseType, requestProxy, timeout, requestMoudle, fake, method, name, paramMap, path, apiRequest;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this, fakeCallBack = _a.fakeCallBack, fakeDelay = _a.fakeDelay, isFake = _a.isFake, onDownloadProgress = _a.onDownloadProgress, onExtractPayload = _a.onExtractPayload, onUploadProgress = _a.onUploadProgress, proxy = _a.proxy, rejectSend = _a.rejectSend, responseEncoding = _a.responseEncoding, responseType = _a.responseType, requestProxy = _a.requestProxy, timeout = _a.timeout;
                requestMoudle = this.requestMoudle;
                fake = item.fake, method = item.method, name = item.name, paramMap = item.paramMap, path = item.path;
                apiRequest = function (payload) {
                    if (payload === void 0) { payload = {}; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var abort, result;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    abort = new abort_controller_1["default"]();
                                    payload.signal = { abort: abort };
                                    // 依据条件拒绝发送
                                    if (rejectSend(payload, abort.signal)) {
                                        return [2 /*return*/, Promise.reject(new Error('Reject Api Send'))];
                                    }
                                    // 是否使用虚假数据, 当fake是函数时，执行fake并返回报文（哪怕报文本身就是函数也在函数内返回）
                                    if (!(0, tools_1.is)(fake, null) && !(0, tools_1.is)(fake, 'undefined') && isFake) {
                                        return [2 /*return*/, new Promise(function (resolve) {
                                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var data, _a, _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(fake instanceof Function)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, fake(payload)];
                                                            case 1:
                                                                _a = _c.sent();
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                _a = fake;
                                                                _c.label = 3;
                                                            case 3:
                                                                data = _a;
                                                                _b = resolve;
                                                                return [4 /*yield*/, fakeCallBack(data, __assign({}, item))];
                                                            case 4:
                                                                _b.apply(void 0, [_c.sent()]);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, fakeDelay);
                                            })
                                                .then(function () {
                                                var args = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    args[_i] = arguments[_i];
                                                }
                                                return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.sendSuccess.apply(this, args)];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                }); });
                                            })["catch"](function () {
                                                var args = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    args[_i] = arguments[_i];
                                                }
                                                return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            _b = (_a = Promise).reject;
                                                            return [4 /*yield*/, this.sendFail.apply(this, args)];
                                                        case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()) || new Error('request fail')])];
                                                    }
                                                }); });
                                            })];
                                    }
                                    // 是否替换发送对象
                                    if (!(0, tools_1.is)(requestMoudle, 'function'))
                                        throw '[crevice-api]: sendee参数需function类型';
                                    return [4 /*yield*/, requestProxy(requestMoudle)
                                        // 发送请求
                                    ];
                                case 1:
                                    // 前置判断是否需要切换代理
                                    requestMoudle = _a.sent();
                                    return [4 /*yield*/, requestMoudle(payload, {
                                            sendSuccess: function () {
                                                var args = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    args[_i] = arguments[_i];
                                                }
                                                return _this.sendSuccess.apply(_this, args);
                                            },
                                            sendFail: function () {
                                                var args = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    args[_i] = arguments[_i];
                                                }
                                                return _this.sendFail.apply(_this, args);
                                            }
                                        })];
                                case 2:
                                    result = _a.sent();
                                    if (!(result instanceof Promise))
                                        return [2 /*return*/];
                                    result = result
                                        .then(function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.sendSuccess.apply(this, args)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); });
                                    })["catch"](function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    _b = (_a = Promise).reject;
                                                    return [4 /*yield*/, this.sendFail.apply(this, args)];
                                                case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()) || new Error('request fail')])];
                                            }
                                        }); });
                                    });
                                    return [2 /*return*/, result];
                            }
                        });
                    });
                };
                return [2 /*return*/, function (data, options) {
                        if (options === void 0) { options = {}; }
                        return __awaiter(_this, void 0, void 0, function () {
                            var query, body, pathParam, payload;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = options.query, body = options.body, pathParam = options.pathParam;
                                        return [4 /*yield*/, this.buildPayload({
                                                body: body,
                                                data: onExtractPayload(data),
                                                method: method,
                                                name: name,
                                                paramMap: paramMap,
                                                path: path,
                                                pathParam: pathParam,
                                                query: query
                                            })];
                                    case 1:
                                        payload = _a.sent();
                                        // 公共上传进度
                                        if ((0, tools_1.is)(onUploadProgress, 'function')) {
                                            payload.onUploadProgress = onUploadProgress;
                                        }
                                        // 公共下载进度
                                        if ((0, tools_1.is)(onDownloadProgress, 'function')) {
                                            payload.onDownloadProgress = onUploadProgress;
                                        }
                                        // 公共接口代理
                                        if ((0, tools_1.is)(proxy, 'object')) {
                                            payload.proxy = proxy;
                                        }
                                        return [2 /*return*/, apiRequest(__assign(__assign(__assign({}, payload), { responseType: responseType, responseEncoding: responseEncoding, timeout: timeout }), options))];
                                }
                            });
                        });
                    }];
            });
        });
    };
    // 自动选择content-type
    CreviceApi.prototype.autoContentType = function (data) {
        if ((0, tools_1.is)(data, 'object'))
            return 'application/json';
        if ((0, tools_1.is)(data, 'string'))
            return 'text/plain';
        if ((0, tools_1.is)(data, Array))
            return 'application/json';
        if ((0, tools_1.is)(data, FormData))
            return 'multipart/form-data';
        return 'text/plain';
    };
    // 注册
    CreviceApi.prototype.register = function () {
        var _this = this;
        var list = this.list;
        list.forEach(function (item) {
            if (item.name in _this) {
                console.warn("[crevice-api]: \u63A5\u53E3".concat(item.name, "\u7684\u547D\u540D\u53D1\u751F\u51B2\u7A81\uFF0C\u8BF7\u4FEE\u6539\u8BE5\u540D\u79F0"));
                return item;
            }
            _this[item.name] = _this.buildRequest(item);
        });
    };
    // 构建API方法
    CreviceApi.prototype.buildPayload = function (_a) {
        var body = _a.body, data = _a.data, method = _a.method, name = _a.name, paramMap = _a.paramMap, path = _a.path, pathParam = _a.pathParam, query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var _b, host, verifyParams, paramMapJson, ContentType, headers, payloadData, nextPath, supportQueryParams, supportQueryAndBodyParams, defaultUseParamsType, sendData, isSkip, requestData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this, host = _b.host, verifyParams = _b.verifyParams;
                        paramMapJson = {};
                        ContentType = this.autoContentType(data);
                        return [4 /*yield*/, this.setHeader({ 'Content-Type': ContentType })];
                    case 1:
                        headers = _c.sent();
                        payloadData = data;
                        nextPath = path;
                        if (verifyParams && (0, tools_1.is)(paramMap, 'undefined') && (0, tools_1.is)(payloadData, 'object')) {
                            throw "[crevice-api]: \u63A5\u53E3".concat(name, "\u9700\u9884\u5B9A\u4E49\u63A5\u53E3\u53C2\u6570\uFF08\u975E\u5FC5\u8981\u5219\u5C06needParamMap\u8BBE\u7F6E\u4E3Afalse\uFF09");
                        }
                        return [4 /*yield*/, this.onBuildPayloadBefore(payloadData)];
                    case 2:
                        // 处理请求报文
                        payloadData = _c.sent();
                        payloadData = this.buildPayloadData(payloadData, paramMap);
                        return [4 /*yield*/, this.onBuildPayloadAfter(payloadData)];
                    case 3:
                        payloadData = _c.sent();
                        // 参数描述
                        paramMap.forEach(function (param) {
                            if ((0, tools_1.is)(param, 'object')) {
                                paramMapJson[param.name] = param;
                            }
                            else {
                                paramMapJson[param] = { name: param };
                            }
                        });
                        supportQueryParams = ['GET', 'DELETE', 'OPTIONS ', 'HEAD '];
                        supportQueryAndBodyParams = ['POST', 'PUT', 'PATCH'];
                        defaultUseParamsType = supportQueryParams.includes(method) ? 'query' : 'body';
                        sendData = { query: {}, body: {} };
                        isSkip = false;
                        // GET方法，参数为文件，表单
                        if (((0, tools_1.is)(payloadData, File) ||
                            (0, tools_1.is)(payloadData, FormData)) && defaultUseParamsType === 'query') {
                            throw '请求报文为二进制文件，协议方法需支持body参数';
                        }
                        // GET方法，参数为数组
                        if (((0, tools_1.is)(payloadData, Array) ||
                            (0, tools_1.is)(payloadData, null)) && defaultUseParamsType === 'query') {
                            sendData.query = JSON.stringify(payloadData);
                            isSkip = true;
                        }
                        // POST方法
                        if (((0, tools_1.is)(payloadData, Array) ||
                            (0, tools_1.is)(payloadData, File) ||
                            (0, tools_1.is)(payloadData, FormData) ||
                            (0, tools_1.is)(payloadData, ArrayBuffer) ||
                            (0, tools_1.is)(payloadData, Blob)) && defaultUseParamsType === 'body') {
                            sendData.body = payloadData;
                            isSkip = true;
                        }
                        // JSON对象类型
                        if ((0, tools_1.is)(payloadData, 'object') && !isSkip) {
                            // 通过paramsMap设置默认值
                            Object.keys(payloadData).forEach(function (key) {
                                var v = payloadData[key];
                                var param = paramMapJson[key];
                                if (!(0, tools_1.is)(param, 'object'))
                                    return;
                                if (param.type === 'body')
                                    sendData.body[key] = v;
                                if (param.type === 'query')
                                    sendData.query[key] = v;
                                if (param.type === 'path')
                                    nextPath = nextPath.replace(new RegExp("@\\{\\{".concat(key, "\\}\\}"), 'g'), data[key]);
                            });
                        }
                        // 额外参数设置
                        if ((0, tools_1.is)(pathParam, 'object')) {
                            Object.keys(pathParam).forEach(function (key) {
                                nextPath = nextPath = nextPath.replace(new RegExp("@\\{\\{".concat(key, "\\}\\}"), 'g'), pathParam[key]);
                            });
                        }
                        if ((0, tools_1.is)(query, 'object')) {
                            Object.keys(query).forEach(function (key) {
                                sendData.query[key] = query[key];
                            });
                        }
                        if ((0, tools_1.is)(body, 'object')) {
                            Object.keys(body).forEach(function (key) {
                                sendData.body[key] = body[key];
                            });
                        }
                        requestData = {};
                        if (Object.keys(sendData.body).length > 0)
                            requestData.data = sendData.body;
                        if (Object.keys(sendData.query).length > 0)
                            requestData.params = sendData.query;
                        return [4 /*yield*/, this.sendBefore(__assign({ headers: headers, method: method, url: host + nextPath }, requestData))];
                    case 4: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // 处理payload, 类型转换
    CreviceApi.prototype.buildPayloadData = function (data, paramMap) {
        if (data === void 0) { data = {}; }
        if (!(0, tools_1.is)(data, 'object') ||
            (0, tools_1.is)(data, File) ||
            (0, tools_1.is)(data, FormData) ||
            (0, tools_1.is)(data, Array) ||
            (0, tools_1.is)(data, ArrayBuffer) ||
            (0, tools_1.is)(data, Blob))
            return data;
        var _a = this, paramsSetDefault = _a.paramsSetDefault, paramsSetDefaultValue = _a.paramsSetDefaultValue;
        var needChagneTypes = [
            'todayStart',
            'todayEnd',
            'todayStartTimestamp',
            'todayEndTimestamp'
        ];
        var canNotChagneTypes = [null, '', undefined];
        var nextData = {};
        var changeDataType = function (param) {
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
                    nextData[param.name] = (0, tools_1.timestamp)(new Date(nextData[param.name]));
                    break;
                // 日期
                case 'date':
                    nextData[param.name] = (0, tools_1.dateFormat)(nextData[param.name]);
                    break;
                // 开始日期
                case 'todayStart':
                    nextData[param.name] = (0, tools_1.today)('start');
                    break;
                // 开始日期时间戳
                case 'todayStartTimestamp':
                    nextData[param.name] = (0, tools_1.timestamp)((0, tools_1.today)('start'));
                    break;
                // 结束日期
                case 'todayEnd':
                    nextData[param.name] = (0, tools_1.today)('end');
                    break;
                // 结束日期时间戳
                case 'todayEndTimestamp':
                    nextData[param.name] = (0, tools_1.timestamp)((0, tools_1.today)('end'));
                    break;
                default:
            }
        };
        // 当报文参数为undefined且paramMap被定义内容时
        if (paramsSetDefault && (0, tools_1.is)(data, 'undefined') && (0, tools_1.is)(paramMap, 'array') && paramMap.length > 0) {
            paramMap.forEach(function (param) {
                var dataType = param instanceof Object && (0, tools_1.is)(param, 'object') ? (param.dataType || '') : '';
                // 数据类型转换
                if (param instanceof Object && (0, tools_1.is)(param, 'object')) {
                    nextData[param.name] = !(0, tools_1.is)(param["default"], 'undefined') ? param["default"] : paramsSetDefaultValue;
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
        paramMap.forEach(function (param) {
            // param为字符串时, 字符串类型不存在别名
            if (typeof param === 'string') {
                if (paramsSetDefault && (0, tools_1.is)(data[param], 'undefined')) {
                    nextData[param] = paramsSetDefaultValue;
                }
                else if (!(0, tools_1.is)(data[param], 'undefined')) {
                    nextData[param] = data[param];
                }
                return param;
            }
            var aliasName = param.aliasName || '';
            var dataType = param.dataType || '';
            // 存在别名时，从别名中取值，否则在原名中取值，都不存在值时从默认值从取值
            if (!(0, tools_1.is)(data[aliasName], 'undefined')) {
                nextData[param.name] = data[aliasName]; // 别名
            }
            else if (!(0, tools_1.is)(data[param.name], 'undefined')) {
                nextData[param.name] = data[param.name]; // 有值时
            }
            else {
                nextData[param.name] = param["default"] || paramsSetDefaultValue; // 设置缺省值
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
    };
    return CreviceApi;
}());
exports["default"] = CreviceApi;


/***/ }),

/***/ 594:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.today = exports.timestamp = exports.dateFormat = exports.def = exports.is = void 0;
var is = function (v, t) {
    if (t === void 0) { t = ''; }
    if (t === 'object')
        return typeof v === 'object' && v !== null && !(v instanceof Array);
    if (t === 'promise' || t === Promise)
        return v instanceof Promise || (typeof v === 'object' && v !== null && typeof v.then === 'function' && typeof v["catch"] === 'function');
    if (t === 'null' || t === null)
        return v === null;
    if (t === 'array')
        return v instanceof Array;
    if (t === 'file')
        return v instanceof File;
    if (t === 'formData')
        return v instanceof FormData;
    if (typeof t !== 'string')
        return v instanceof t;
    return typeof v === t;
};
exports.is = is;
var def = function (v, d) { return (0, exports.is)(v, 'undefined') ? d : v; };
exports.def = def;
var dateFormat = function (params) {
    var date = new Date(params);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    i = i < 10 ? '0' + i : i;
    s = s < 10 ? '0' + s : s;
    return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(h, ":").concat(i, ":").concat(s);
};
exports.dateFormat = dateFormat;
var timestamp = function (param) {
    return (new Date(param)).getTime();
};
exports.timestamp = timestamp;
var today = function (key) {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return ({
        start: "".concat(y, "-").concat(m, "-").concat(d, " 00:00:00"),
        end: "".concat(y, "-").concat(m, "-").concat(d, " 23:59:59")
    })[key];
};
exports.today = today;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

exports.__esModule = true;
exports.CreviceApi = exports.AxiosDecorator = void 0;
var CreviceApi_1 = __webpack_require__(778);
exports.CreviceApi = CreviceApi_1["default"];
var AxiosDecorator_1 = __webpack_require__(217);
exports.AxiosDecorator = AxiosDecorator_1["default"];
exports["default"] = CreviceApi_1["default"];

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map