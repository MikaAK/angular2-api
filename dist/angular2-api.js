(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular2/core"), require("angular2/http"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"));
	else if(typeof define === 'function' && define.amd)
		define(["angular2/core", "angular2/http", "rxjs/add/operator/map", "rxjs/add/operator/mergeMap"], factory);
	else if(typeof exports === 'object')
		exports["angular2-api"] = factory(require("angular2/core"), require("angular2/http"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"));
	else
		root["angular2-api"] = factory(root["angular2/core"], root["angular2/http"], root["rxjs/add/operator/map"], root["rxjs/add/operator/mergeMap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(2);
	var ApiService_1 = __webpack_require__(3);
	exports.ApiService = ApiService_1.ApiService;
	exports.provideApiService = function () {
	  return [core_1.provide(ApiService_1.ApiService, { deps: [http_1.Http] })];
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(5);
	var removeSlashes = function removeSlashes(url) {
	    if (url.startsWith('/')) url = url.slice(1, url.length - 1);
	    if (url.endsWith('/')) url = url.slice(0, url.length - 2);
	    return url;
	};
	var toJSON = function toJSON(data) {
	    try {
	        return JSON.stringify(data);
	    } catch (e) {
	        return data;
	    }
	};
	var serializeParams = function serializeParams() {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (!params.headers) params.headers = new http_1.Headers({ 'Content-Type': 'applications/json' });
	    return params;
	};
	var deserializeResponse = function deserializeResponse(resp) {
	    var contentType = resp && resp.headers && resp.headers.get('Content-Type');
	    if (!contentType) return resp;
	    if (/json/.test(contentType)) return resp.json();else if (/text/.test(contentType)) return resp.text();else if (/blob/.test(contentType)) return resp.blob();else return resp;
	};
	var resourceDeserialize = function resourceDeserialize(resource) {
	    return function (data) {
	        return typeof resource.deserialize === 'function' ? resource.deserialize(data) : data;
	    };
	};
	var ApiService = function () {
	    function ApiService(_http) {
	        _classCallCheck(this, ApiService);

	        this._http = _http;
	        this.basePath = '/api';
	    }

	    _createClass(ApiService, [{
	        key: "initialize",
	        value: function initialize(resource) {
	            resource.get = this.get.bind(this, resource);
	            resource.post = this.post.bind(this, resource);
	            resource.patch = this.patch.bind(this, resource);
	            resource.put = this.put.bind(this, resource);
	            resource.delete = this.delete.bind(this, resource);
	            resource.find = this.find.bind(this, resource);
	            resource.findAll = this.findAll.bind(this, resource);
	            resource.create = this.create.bind(this, resource);
	            resource.update = this.update.bind(this, resource);
	            resource.destroy = this.destroy.bind(this, resource);
	        }
	    }, {
	        key: "createUrl",
	        value: function createUrl(resource, url) {
	            var qUrl = Array.isArray(url) ? url.join('/') : url;
	            return removeSlashes(resource.endpoint) + "/" + removeSlashes(this.basePath) + "/" + removeSlashes(qUrl);
	        }
	    }, {
	        key: "get",
	        value: function get(resource, url, params) {
	            var _this = this;

	            return this._http.get(this.createUrl(resource, url), this._serializeParams(params)).map(function (data) {
	                return _this._deserialize(data);
	            }).mergeMap(resourceDeserialize(resource));
	        }
	    }, {
	        key: "put",
	        value: function put(resource, url, data, params) {
	            var _this2 = this;

	            return this._http.put(this.createUrl(resource, url), this._serialize(resource, data), params).map(function (data) {
	                return _this2._deserialize(data);
	            }).mergeMap(resourceDeserialize(resource));
	        }
	    }, {
	        key: "patch",
	        value: function patch(resource, url, data, params) {
	            var _this3 = this;

	            return this._http.patch(this.createUrl(resource, url), this._serialize(resource, data), params).map(function (data) {
	                return _this3._deserialize(data);
	            }).mergeMap(resourceDeserialize(resource));
	        }
	    }, {
	        key: "post",
	        value: function post(resource, url, data, params) {
	            var _this4 = this;

	            return this._http.post(this.createUrl(resource, url), this._serialize(resource, data), params).map(function (data) {
	                return _this4._deserialize(data);
	            }).mergeMap(resourceDeserialize(resource));
	        }
	    }, {
	        key: "delete",
	        value: function _delete(resource, url, params) {
	            var _this5 = this;

	            return this._http.get(this.createUrl(resource, url), this._serializeParams(params)).map(function (data) {
	                return _this5._deserialize(data);
	            }).mergeMap(resourceDeserialize(resource));
	        }
	    }, {
	        key: "find",
	        value: function find(resource, id, params) {
	            if (!id) throw new Error('You must provide an id');
	            return this.get(resource, id, params);
	        }
	    }, {
	        key: "findAll",
	        value: function findAll(resource, params) {
	            return this.get(resource, '', params);
	        }
	    }, {
	        key: "create",
	        value: function create(resource, data, params) {
	            return this.post(resource, '', data, params);
	        }
	    }, {
	        key: "update",
	        value: function update(resource, data, params) {
	            var id = data[resource.idAttribute],
	                url = id ? id : '';
	            return this.put(resource, url, data, params);
	        }
	    }, {
	        key: "destroy",
	        value: function destroy(resource, id, params) {
	            if ((typeof id === "undefined" ? "undefined" : _typeof(id)) === 'object') {
	                params = id;
	                id = null;
	            }
	            return this.delete(resource, id ? id : '', params);
	        }
	    }, {
	        key: "_serialize",
	        value: function _serialize(resource, data) {
	            var nData = toJSON(data);
	            return resource.serialize ? resource.serialize(nData) : nData;
	        }
	    }, {
	        key: "_deserialize",
	        value: function _deserialize(data) {
	            return deserializeResponse(data);
	        }
	    }, {
	        key: "_serializeParams",
	        value: function _serializeParams(params) {
	            return serializeParams(params);
	        }
	    }]);

	    return ApiService;
	}();
	ApiService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http])], ApiService);
	exports.ApiService = ApiService;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;