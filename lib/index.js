import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import Icon, { createFromIconfontCN } from '@ant-design/icons';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".el-loading-common-mask {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  font-size: 20px;\n}\n\n.el-loading-absolute-mask {\n  position: absolute;\n}\n\n.el-loading-fixed-mask {\n  position: fixed;\n}\n\n.antd-loading-html--hidden {\n  overflow: hidden !important;\n}\n\n.antd-targetDOM-position {\n  position: relative;\n}\n";
styleInject(css_248z);

var antdSpin = /*#__PURE__*/function () {
  function antdSpin() {
    _classCallCheck(this, antdSpin);

    _defineProperty(this, "options", {});

    _defineProperty(this, "dom", null);

    _defineProperty(this, "targetDOM", null);

    _defineProperty(this, "requestFlag", false);

    _defineProperty(this, "config", {
      /*
              可传入一个 DOM 对象或字符串；
              若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
          */
      target: "",
      lock: false,
      // 显示在加载图标下方的加载文案
      text: "",
      background: "transparent",
      // 组件大小，可选值为 small default large
      size: "large",
      // 自定义组件的类名
      customClass: "",
      // 加载图标的一些配置
      loadingConfig: {
        // 自定义加载图标类名
        spinner: "",

        /* 图标旋转角度（IE9 无效） */
        rotate: 0,

        /* 是否有旋转动画 */
        spin: false,

        /* style 设置图标的样式，例如 fontSize 和 color */
        style: {},

        /* 仅适用双色图标。设置双色图标的主要颜色	string (十六进制颜色) */
        twoToneColor: "#eb2f96"
      },
      indicator: "",

      /* 使用 SVG 自定义的图标 */
      component: null,
      IconFont: {},
      // 取消 console.log
      log: false
    });
  }

  _createClass(antdSpin, [{
    key: "service",
    value: function service() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /* 先判断 target 字段是否合法 */
      if (options !== null && options !== void 0 && options.hasOwnProperty("target")) {
        var targetValue = options.target;

        if (typeof targetValue === "string" || targetValue instanceof HTMLElement || targetValue === null || targetValue !== null && targetValue !== void 0 && targetValue.hasOwnProperty("current")) {
          this.options.log && console.log("option.target is effective!");
        } else {
          throw new Error("option target error,please check!");
        }
      }
      /* options 未自定义的字段，使用默认值 */


      var config = this.config;

      for (var k in config) {
        if (!options[k]) {
          options[k] = config[k];
        }

        if (k === "loadingConfig" && options[k]) {
          for (var j in config[k]) {
            if (!options[k][j]) {
              options[k][j] = config[k][j];
            }
          }
        }
      }
      /* 备份，主要方便 close 使用 */


      this.options = options;
      this.targetDOM = options.target;
      /* 单例模式，保证未关闭前只打开一个 loading */

      if (!this.requestFlag) {
        var _this$targetDOM;

        this.requestFlag = true; // 创建 Spin/loading

        this.dom = document.createElement("div");
        /* 添加蒙版 */

        this.dom.classList.add("el-loading-common-mask");
        /* 如果添加到全局，定位采用 fixed，否则采用 abso */

        if (this.targetDOM === null) {
          this.dom.classList.add("el-loading-fixed-mask");
        } else {
          this.dom.classList.add("el-loading-absolute-mask");
        }
        /* 蒙版背景色 */


        this.dom.setAttribute("style", "background-color: ".concat(options.background, ";"));
        /* 是否添加自定义类名 */

        if (options.customClass.length) {
          this.dom.classList.add(options.customClass);
        }
        /* 是否禁止滚动 */


        if (options.lock) {
          document.documentElement.classList.add("antd-loading-html--hidden");
        }
        /*
                  难点
              */


        this.customSpinIcons().then(function (AntDesignIcons) {
          ReactDOM.render( /*#__PURE__*/React.createElement(Spin, {
            tip: options.text,
            size: options.size,
            indicator: AntDesignIcons
          }), _this.dom);
        });
        /*
                  1. target 为字符串，使用 querySelector 获取 DOM
                  2. target 是 DOM，JS 原生 DOM 或 ReactNode
              */

        if (typeof options.target === "string" && options.target.length) {
          this.targetDOM = document.querySelector("#".concat(options.target)) || document.querySelector(".".concat(options.target));
          /* 判断得到是否是 DOM 节点，不是的话 直接报错 */

          if (this.targetDOM) {
            this.appendDOM2Target();
          } else {
            throw new Error("find error: No DOM found using querySelector API!");
          }
        } else if ((_this$targetDOM = this.targetDOM) !== null && _this$targetDOM !== void 0 && _this$targetDOM.hasOwnProperty("current")) {
          // 1. ReactDOM
          requestAnimationFrame(function () {
            _this.targetDOM = _this.targetDOM.current;

            if (_this.targetDOM instanceof HTMLElement) {
              _this.appendDOM2Target();
            } else {
              throw new Error("ref target no current DOM!");
            }
          });
        } else if (this.targetDOM instanceof HTMLElement) {
          // 2. JS 原生 DOM
          this.appendDOM2Target();
        } else {
          document.body.appendChild(this.dom);
        }
      }

      return this;
    }
  }, {
    key: "strMapToObj",
    value: function strMapToObj(strMap) {
      var obj = Object.create(null);

      var _iterator = _createForOfIteratorHelper(strMap),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              k = _step$value[0],
              v = _step$value[1];

          obj[k] = v;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return obj;
    }
  }, {
    key: "customSpinIcons",
    value: function () {
      var _customSpinIcons = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$options$loading,
            _this2 = this;

        var loadingConfig, _this$options$IconFon, type, scriptUrl, IconFont, loadingMapConfig, CustomIcon, modules, AntDesignIcons;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loadingConfig = (_this$options$loading = this.options.loadingConfig) !== null && _this$options$loading !== void 0 ? _this$options$loading : {};
                /*
                        图标分三种：
                        1. antd 自带的基本图标 indicator 字段控制
                        1. 用户自定义的图标 component 字段控制
                        2. 在线 iconfont 图标 IconFont 字段控制
                        设置时，只能三选一
                    */

                if (!(this.options.IconFont.type || this.options.IconFont.scriptUrl)) {
                  _context.next = 4;
                  break;
                }

                if (!(this.options.component || this.options.indicator.length)) {
                  _context.next = 4;
                  break;
                }

                throw new Error("Icon configuration field：You set the ⭐️IconFont⭐️ field has been effective, please delete 👉component and indicator👈！");

              case 4:
                if (!this.options.component) {
                  _context.next = 7;
                  break;
                }

                if (!(this.options.IconFont.type || this.options.IconFont.scriptUrl || this.options.indicator.length)) {
                  _context.next = 7;
                  break;
                }

                throw new Error("Icon configuration field：You set the ⭐️component⭐️ field has been effective, please delete 👉IconFont and indicator👈！");

              case 7:
                if (!this.options.indicator.length) {
                  _context.next = 10;
                  break;
                }

                if (!(this.options.IconFont.type || this.options.IconFont.scriptUrl || this.options.component)) {
                  _context.next = 10;
                  break;
                }

                throw new Error("Icon configuration field：You set the ⭐️indicator⭐️ field has been effective, please delete 👈component and 👉IconFont👈！");

              case 10:
                if (!this.options.IconFont.type) {
                  _context.next = 14;
                  break;
                }

                _this$options$IconFon = this.options.IconFont, type = _this$options$IconFon.type, scriptUrl = _this$options$IconFon.scriptUrl;
                IconFont = createFromIconfontCN({
                  scriptUrl: scriptUrl
                });
                return _context.abrupt("return", /*#__PURE__*/React.createElement(IconFont, {
                  type: type
                }));

              case 14:
                if (!this.options.component) {
                  _context.next = 20;
                  break;
                }

                /* 自定义图标有 twoToneColor 会报错，所以需要去除它 */
                loadingMapConfig = new Map(Object.entries(loadingConfig));
                loadingMapConfig["delete"]("twoToneColor");
                loadingConfig = this.strMapToObj(loadingMapConfig);

                CustomIcon = function CustomIcon(props) {
                  return /*#__PURE__*/React.createElement(Icon, _extends({
                    component: _this2.options.component
                  }, props));
                };

                return _context.abrupt("return", /*#__PURE__*/React.createElement(CustomIcon, loadingConfig));

              case 20:
                if (!this.options.indicator.length) {
                  _context.next = 30;
                  break;
                }

                _context.next = 23;
                return import('@ant-design/icons');

              case 23:
                modules = _context.sent;
                AntDesignIcons = modules[this.options.indicator];

                if (AntDesignIcons) {
                  _context.next = 27;
                  break;
                }

                throw new Error("sorry the module you need was not found in @ant-design/icons4!");

              case 27:
                return _context.abrupt("return", /*#__PURE__*/React.createElement(AntDesignIcons, loadingConfig));

              case 30:
                return _context.abrupt("return", "");

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function customSpinIcons() {
        return _customSpinIcons.apply(this, arguments);
      }

      return customSpinIcons;
    }()
  }, {
    key: "appendDOM2Target",
    value: function appendDOM2Target() {
      /* 定位 子绝父相 */
      // static | relative | absolute | sticky | fixed
      var position = globalThis.getComputedStyle(this.targetDOM, null).getPropertyValue("position");

      if (position === "inherit" || position === "static") {
        /* 还需要移除 */
        this.targetDOM.classList.add("antd-targetDOM-position");
      }

      this.targetDOM.appendChild(this.dom);
    }
  }, {
    key: "close",
    value: function close() {
      /* 移除已经上树的 React 组件 Spin，并清除其绑定的事件和状态 */
      var unmountComponentAtNode = ReactDOM.unmountComponentAtNode(this.dom);

      if (unmountComponentAtNode) {
        this.options.log && console.info("component was unmounted!");
      } else {
        this.options.log && console.info("no component to unmount!");
      } // 隐藏 Spin/loading


      if (this.requestFlag) {
        this.requestFlag = false;
        /* 移除 DOM */

        if (this.targetDOM !== null) {
          this.targetDOM.removeChild(this.dom);
          this.targetDOM.classList.remove("antd-targetDOM-position");
        } else {
          document.body.removeChild(this.dom);
        }

        this.targetDOM = this.dom = null;
      }
      /* 禁止滚动时，需要移除 */


      if (this.options.lock) {
        this.options.lock = false;
        document.documentElement.classList.remove("antd-loading-html--hidden");
      }
    }
  }]);

  return antdSpin;
}();

var antdSpin$1 = new antdSpin();

export default antdSpin$1;
export { antdSpin$1 as antdSpin };
