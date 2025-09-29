(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/WechatLogin"],{

/***/ 528:
/*!*********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WechatLogin.vue?vue&type=template&id=22327458&scoped=true& */ 529);
/* harmony import */ var _WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WechatLogin.vue?vue&type=script&lang=js& */ 531);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WechatLogin.vue?vue&type=style&index=0&id=22327458&scoped=true&lang=css& */ 533);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "22327458",
  null,
  false,
  _WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/WechatLogin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 529:
/*!****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue?vue&type=template&id=22327458&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./WechatLogin.vue?vue&type=template&id=22327458&scoped=true& */ 530);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_template_id_22327458_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 530:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue?vue&type=template&id=22327458&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 531:
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./WechatLogin.vue?vue&type=script&lang=js& */ 532);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 532:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 105));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 107));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'WechatLogin',
  data: function data() {
    return {
      loading: false
    };
  },
  methods: {
    // 获取手机号按钮回调
    handleGetPhoneNumber: function handleGetPhoneNumber(e) {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var phoneResult, userInfo, _userInfo;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.loading) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                _this.loading = true;
                _context.prev = 3;
                if (!(e.detail.errMsg !== 'getPhoneNumber:ok')) {
                  _context.next = 7;
                  break;
                }
                uni.showToast({
                  title: '获取手机号失败，请重试',
                  icon: 'none'
                });
                return _context.abrupt("return");
              case 7:
                if (e.detail.code) {
                  _context.next = 10;
                  break;
                }
                uni.showToast({
                  title: '获取手机号失败，请重试',
                  icon: 'none'
                });
                return _context.abrupt("return");
              case 10:
                uni.showLoading({
                  title: '登录中...',
                  mask: true
                });
                _context.prev = 11;
                _context.next = 14;
                return _this.getPhoneNumberFromServer(e.detail.code);
              case 14:
                phoneResult = _context.sent;
                if (phoneResult.success) {
                  _context.next = 17;
                  break;
                }
                throw new Error(phoneResult.message || '获取手机号失败');
              case 17:
                // 构建用户信息
                userInfo = {
                  nickName: phoneResult.phoneNumber || '访客用户',
                  phone: phoneResult.phoneNumber,
                  avatarUrl: '',
                  loginType: 'wechatPhone',
                  timestamp: Date.now()
                }; // 保存登录信息到本地
                _this.saveLoginInfo(userInfo, e.detail.code);
                uni.hideLoading();
                uni.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500
                });
                _this.$emit('login-success', userInfo);
                _this.navigateToProfile();
                _context.next = 34;
                break;
              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](11);
                console.error('API登录失败，尝试备用方案:', _context.t0);

                // 备用方案：直接使用访客模式登录
                _userInfo = {
                  nickName: '访客用户',
                  phone: '',
                  avatarUrl: '',
                  loginType: 'guest',
                  timestamp: Date.now()
                }; // 保存登录信息到本地
                _this.saveLoginInfo(_userInfo, e.detail.code);
                uni.hideLoading();
                uni.showToast({
                  title: '登录成功（访客模式）',
                  icon: 'success',
                  duration: 2000
                });
                _this.$emit('login-success', _userInfo);
                _this.navigateToProfile();
              case 34:
                _context.next = 41;
                break;
              case 36:
                _context.prev = 36;
                _context.t1 = _context["catch"](3);
                uni.hideLoading();
                uni.showToast({
                  title: _context.t1.message || '登录失败，请重试',
                  icon: 'none'
                });
                _this.$emit('login-error', _context.t1);
              case 41:
                _context.prev = 41;
                _this.loading = false;
                return _context.finish(41);
              case 44:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 36, 41, 44], [11, 25]]);
      }))();
    },
    // 调用后端接口获取手机号
    getPhoneNumberFromServer: function getPhoneNumberFromServer(code) {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var response;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this2.callBackendAPI(code);
              case 3:
                response = _context2.sent;
                if (!response.success) {
                  _context2.next = 8;
                  break;
                }
                return _context2.abrupt("return", {
                  success: true,
                  phoneNumber: response.phoneNumber,
                  message: '获取手机号成功'
                });
              case 8:
                throw new Error(response.message || '获取手机号失败');
              case 9:
                _context2.next = 15;
                break;
              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                console.error('获取手机号失败:', _context2.t0);
                throw new Error('网络请求失败');
              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }))();
    },
    // 调用后端 API
    callBackendAPI: function callBackendAPI(code) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var response, _response$data, errorMsg, _errorMsg;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                console.log('开始调用登录API，code:', code);

                // 使用阿里云服务器地址
                _context3.next = 4;
                return uni.request({
                  url: 'https://llzmlxb.xyz/api/auth/get-phone-number',
                  method: 'POST',
                  data: {
                    code: code
                  },
                  header: {
                    'Content-Type': 'application/json'
                  },
                  timeout: 10000
                });
              case 4:
                response = _context3.sent;
                console.log('API响应:', response);
                console.log('API响应数据:', response.data);
                if (!(response && response.statusCode === 200)) {
                  _context3.next = 17;
                  break;
                }
                if (!(response.data && response.data.code === 0)) {
                  _context3.next = 12;
                  break;
                }
                return _context3.abrupt("return", {
                  success: true,
                  phoneNumber: response.data.data.userInfo.phoneNumber,
                  message: response.data.message
                });
              case 12:
                errorMsg = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || '获取手机号失败';
                console.error('API返回错误:', errorMsg, response);
                throw new Error(errorMsg);
              case 15:
                _context3.next = 20;
                break;
              case 17:
                _errorMsg = (response === null || response === void 0 ? void 0 : response.errMsg) || '网络请求失败';
                console.error('API请求失败:', _errorMsg, response);
                throw new Error(_errorMsg);
              case 20:
                _context3.next = 32;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);
                console.error('API调用失败:', _context3.t0);
                // 如果是网络错误，提供更友好的提示
                if (!(_context3.t0.errMsg && _context3.t0.errMsg.includes('timeout'))) {
                  _context3.next = 29;
                  break;
                }
                throw new Error('网络超时，请检查网络连接');
              case 29:
                if (!(_context3.t0.errMsg && _context3.t0.errMsg.includes('fail'))) {
                  _context3.next = 31;
                  break;
                }
                throw new Error('网络请求失败，请检查网络连接');
              case 31:
                throw _context3.t0;
              case 32:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 22]]);
      }))();
    },
    // 保存登录信息
    saveLoginInfo: function saveLoginInfo(userInfo, code) {
      try {
        uni.removeStorageSync('userInfo');
        uni.removeStorageSync('wechatPhoneCode');
        uni.removeStorageSync('loginType');
        uni.removeStorageSync('isLoggedIn');
        uni.setStorageSync('userInfo', userInfo);
        uni.setStorageSync('wechatPhoneCode', code);
        uni.setStorageSync('loginType', 'wechatPhone');
        uni.setStorageSync('isLoggedIn', true);
      } catch (error) {
        console.error('保存登录信息失败:', error);
      }
    },
    // 跳转个人中心
    navigateToProfile: function navigateToProfile() {
      setTimeout(function () {
        uni.reLaunch({
          url: '/pages/index/index?tab=4'
        });
      }, 1500);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 533:
/*!******************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue?vue&type=style&index=0&id=22327458&scoped=true&lang=css& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./WechatLogin.vue?vue&type=style&index=0&id=22327458&scoped=true&lang=css& */ 534);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Hbuilder_X_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_WechatLogin_vue_vue_type_style_index_0_id_22327458_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 534:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/lxb/components/WechatLogin.vue?vue&type=style&index=0&id=22327458&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/WechatLogin.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/WechatLogin-create-component',
    {
        'components/WechatLogin-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(528))
        })
    },
    [['components/WechatLogin-create-component']]
]);
