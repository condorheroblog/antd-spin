# antd-spin

[![NPM version](https://img.shields.io/npm/v/antd-spin)](https://www.npmjs.com/package/antd-spin)
![Downloads](https://img.shields.io/npm/dw/antd-spin)
[![License](https://img.shields.io/npm/l/antd-spin)](./LICENSE)

> Show animation while loading data.

### 目的

如果你使用 Vue 开发项目，那么你一定用过或听过大名鼎鼎的 [Element-UI](https://element.eleme.cn/#/zh-CN/component/installation)，在 [Element-UI](https://element.eleme.cn/#/zh-CN/component/installation) 众多好用的组件中，有一个组件叫 Loading 组件，这个组件使用起来特别的灵活，支持：

- 指令方式和服务方式（服务方式还带单例模式）
- 灵活的配置项，特别是 target 可以随意指定渲染节点。

可惜的是，强大无比的 Antd ，它的 [Spin](https://ant.design/components/spin-cn/) 组件竟然就只支持指令方式，而且配置选项还无法支持我们指定 DOM 进行渲染，尤其是在项目中使用非常的不方便。

所以就用 Antd UI 框架的 [Spin](https://ant.design/components/spin-cn/) 组件和 [Icon](https://ant.design/components/icon-cn/) 组件来实现 [Element-UI](https://element.eleme.cn/#/zh-CN/component/installation) 的 [Loading](https://element.eleme.cn/#/zh-CN/component/loading) 组件的**服务方式** 功能。

### 快速开始

1. 使用 npm 安装依赖

```bash
$ npm install antd --save-dev
```

2. 使用

```js
// 1. 引入，支持两种方式的引入
import antdSpin from "antd-spin";
// import { antdSpin } from "antd-spin";

// 2.创建一个实例，默认创建一个全局的 loading
/* 
    创建一个 loading 实例，未关闭这个实例之前，只能创建一个，因为它单例的。
    注意⚠️：service 的参数都是可选的
*/
const loadingInstance = antdSpin.service();
const loadingInstance1 = antdSpin.service();
const loadingInstance2 = antdSpin.service();
/* 只会有一个 loading 生效 */
console.log(loadingInstance1 === loadingInstance2); // true

// 3. 关闭
/* 五秒之后自动关闭 */
setTimeout(() => {
    loadingInstance.close();
}, 5000);

// 4. 浏览器刷新项目，观察
```

![singleton-mode](./img/singleton-mode.gif)

### 配置

基本配置主要包含一些公用的常用配置，如下：

| Property | Description | Type | Default Value|
| :---: | :---: | :---: | :---: |
| 参数 | 说明 | 类型 | 默认值 |
| text | 显示在加载图标下方的加载文案 | string | - |
| size | 组件大小，可选值为 `small` `default` `large` | string | `default` |
| background | 遮罩背景色 | string | - |
| customClass | Loading 组件的自定义类名 | string | - |
| lock | 出现 loading 的时候，禁止屏幕滚动 | boolean | false |
| log | 是否启用 `console` 打印日志 | boolean | false |
| target | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector 以获取到对应 DOM 节点 | object/string | document.body |

> 补充：target 字段支持 DOM 对象，DOM 对象支持两种方式使用。
- JS 原生 DOM 对象，例如通过 `document.getElementById("app")` 捕获的 DOM。
- React API 创建的 DOM 对象，例如通过 useRef/createRef 创建的 DOM 对象。记住给 antd-spin 传参的时候是 `ref.current`，而不是支持传入 `ref`。

加载图标的方法，主要有三种方式，注意⚠️，**三种加载方式只能任选其一，不能同时共存，否则会抛出错误。**：

1. 使用 Antd 自带的图标

| Property | Description | Type | Default Value|
| :---: | :---: | :---: | :---: |
| 参数 | 说明 | 类型 | 默认值 |
| indicator | 自定义加载图标 | string | - |

例如：要想加载 Antd 的 `<LoadingOutlined />` 这个图标组件，只需要这样配置：

```js
{
    ...options,
    indicator: "LoadingOutlined"
}
```
2. 自定义图标

如果项目有自己的图标，首先要保证这张图片是 SVG 格式的。看例子：

```js
//  1. 引入 SVG 图片
const HeartSvg = (props) => (
    <svg { ...props } width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);
/* 
    这里千万注意⚠️ ，自定义SVG图标函数，必须有 props 属性，才能继承 Antd 的 spin（动画） rotate（旋转）等属性。
    没有 props 的话，直接开启 Antd 的 spin/rotate 是没有效果的。
    坑爹的 Antd 官网竟然没有说明
    Icon spin prop not working when custom ：https://github.com/ant-design/ant-design-icons/issues/270
*/

// 2. 通过 component 字段配置使用
{
    ...options,
    component: HeartSvg
}
```

3. 在线图标（不推荐）

> 友情提示：因为这种图标是外链阿里妈妈的网站，所以图标加载视网络速度可能会出现不同时间的延迟，所以不推荐使用，有此功能纯碎是为了支持 Antd 的 Icon 组件的所有使用方式。

如果你项目的图标是通过 [iconfont](https://www.iconfont.cn/) 来管理的，可直接在项目中外链引入网站上的图标：

```js
{
    ...options,
    IconFont: {
        type: "icon-tuichu",
        scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
    }
}

// 要想引入多个资源， scriptUrl 当成数组使用
{
    ...options,
    IconFont: {
        type: "icon-tuichu",
        scriptUrl: [
            "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
            "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
        ]
    }
}

```

上面三种引入图标的方式都可以通过 loadingConfig 字段来添加一些自定义的动画，样式等。loadingConfig 字段所有的默认配置如下：

```js
{
    ...options,
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
    }
}
```

> 当前时间 Tuesday, November 24, 2020 15:59:25 