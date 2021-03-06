import { Spin } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Icon, { createFromIconfontCN } from "@ant-design/icons";

class antdSpin {
  options = {};
  dom = null;
  targetDOM = null;
  // 当前是否正在请求
  requestFlag = false;
  config = {
    /*
            可传入一个 DOM 对象或字符串；
            若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
        */
    target: null,
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
      twoToneColor: "#eb2f96",
    },
    indicator: "",
    /* 使用 SVG 自定义的图标 */
    component: null,
    IconFont: {},
    // 取消 console.log
    log: false,
  };

  service(options = {}) {
    /* 先判断 target 字段是否合法 */
    if (options?.hasOwnProperty("target")) {
      const targetValue = options.target;
      if (
        typeof targetValue === "string" ||
        targetValue instanceof HTMLElement ||
        targetValue === null ||
        targetValue?.hasOwnProperty("current")
      ) {
        this.options.log && console.log("option.target is effective!");
      } else {
        throw new Error("option target error,please check!");
      }
    }
    /* options 未自定义的字段，使用默认值 */
    const config = this.config;
    for (let k in config) {
      if (!options[k]) {
        options[k] = config[k];
      }

      if (k === "loadingConfig" && options[k]) {
        for (let j in config[k]) {
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
      this.requestFlag = true;
      // 创建 Spin/loading
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
      this.dom.setAttribute("style", `background-color: ${options.background};`);

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
      this.customSpinIcons().then((AntDesignIcons) => {
        ReactDOM.render(<Spin tip={options.text} size={options.size} indicator={AntDesignIcons} />, this.dom);
      });

      /*
                1. target 为字符串，使用 querySelector 获取 DOM
                2. target 是 DOM，JS 原生 DOM 或 ReactNode
            */
      if (typeof options.target === "string" && options.target.length) {
        this.targetDOM = document.querySelector(`#${options.target}`) || document.querySelector(`.${options.target}`);

        /* 判断得到是否是 DOM 节点，不是的话 直接报错 */
        if (this.targetDOM) {
          this.appendDOM2Target();
        } else {
          throw new Error("find error: No DOM found using querySelector API!");
        }
      } else if (this.targetDOM?.hasOwnProperty("current")) {
        throw new Error(
          "when u use ReactDOM's method to pass reference to target, please input 👉ref.current👈 instead of 👉ref👈"
        );
      } else if (this.targetDOM instanceof HTMLElement) {
        // 1. ReactDOM 2. JS 原生 DOM
        this.appendDOM2Target();
      } else {
        document.body.appendChild(this.dom);
      }
    }

    return this;
  }

  async customSpinIcons() {
    let loadingConfig = this.options.loadingConfig ?? {};
    /*
            图标分三种：
            1. antd 自带的基本图标 indicator 字段控制
            1. 用户自定义的图标 component 字段控制
            2. 在线 iconfont 图标 IconFont 字段控制
            设置时，只能三选一
        */
    if (this.options.IconFont.type || this.options.IconFont.scriptUrl) {
      if (this.options.component || this.options.indicator.length) {
        throw new Error(
          "Icon configuration field：You set the ⭐️IconFont⭐️ field has been effective, please delete 👉component and indicator👈！"
        );
      }
    }

    if (this.options.component) {
      if (this.options.IconFont.type || this.options.IconFont.scriptUrl || this.options.indicator.length) {
        throw new Error(
          "Icon configuration field：You set the ⭐️component⭐️ field has been effective, please delete 👉IconFont and indicator👈！"
        );
      }
    }

    if (this.options.indicator.length) {
      if (this.options.IconFont.type || this.options.IconFont.scriptUrl || this.options.component) {
        throw new Error(
          "Icon configuration field：You set the ⭐️indicator⭐️ field has been effective, please delete 👈component and 👉IconFont👈！"
        );
      }
    }

    if (this.options.IconFont.type) {
      const { type, scriptUrl } = this.options.IconFont;
      const IconFont = createFromIconfontCN({ scriptUrl });
      /* IconFont 图标有 twoToneColor 会报错，所以需要去除它 */
      delete loadingConfig.twoToneColor;
      return <IconFont type={type} {...loadingConfig} />;
    }

    if (this.options.component) {
      /* 自定义图标有 twoToneColor 会报错，所以需要去除它 */
      delete loadingConfig.twoToneColor;

      const CustomIcon = (props) => <Icon component={this.options.component} {...props} />;
      return <CustomIcon {...loadingConfig} />;
    }

    if (this.options.indicator.length) {
      const modules = await import("@ant-design/icons");
      const AntDesignIcons = modules[this.options.indicator];
      if (!AntDesignIcons) {
        throw new Error("sorry the module you need was not found in @ant-design/icons4!");
      }

      return <AntDesignIcons {...loadingConfig} />;
    } else {
      return "";
    }
  }

  appendDOM2Target() {
    /* 定位 子绝父相 */
    // static | relative | absolute | sticky | fixed
    const position = globalThis.getComputedStyle(this.targetDOM, null).getPropertyValue("position");
    if (position === "inherit" || position === "static") {
      /* 还需要移除 */
      this.targetDOM.classList.add("antd-targetDOM-position");
    }
    this.targetDOM.appendChild(this.dom);
  }

  domRemoveChild(containerDOM, targetDOM) {
    if (containerDOM?.contains(targetDOM)) {
      containerDOM.removeChild(targetDOM);
      this.options.log && console.log("ChildDOM remove success!");
    } else {
      this.options.log && console.log("ChildDOM not append containerDOM!");
    }
  }

  close() {
    /* 移除已经上树的 React 组件 Spin，并清除其绑定的事件和状态 */
    const unmountComponentAtNode = ReactDOM.unmountComponentAtNode(this.dom);
    if (unmountComponentAtNode) {
      this.options.log && console.info("component was unmounted!");
    } else {
      this.options.log && console.info("no component to unmount!");
    }

    // 隐藏 Spin/loading
    if (this.requestFlag) {
      this.requestFlag = false;
      /* 移除 DOM */
      if (this.targetDOM !== null) {
        this.domRemoveChild(this.targetDOM, this.dom);
        this.targetDOM.classList.remove("antd-targetDOM-position");
      } else {
        this.domRemoveChild(document.body, this.dom);
      }
      this.targetDOM = this.dom = null;
    }

    /* 禁止滚动时，需要移除 */
    if (this.options.lock) {
      this.options.lock = false;
      document.documentElement.classList.remove("antd-loading-html--hidden");
    }
  }
}

export default new antdSpin();
