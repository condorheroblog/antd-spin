// rollup.config.js
import babelRollup from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";

export default {
  // 核心选项
  input: "./src/index.js", // 必须
  external: ["react", "react-dom", "antd", "@ant-design/icons"],
  plugins: [babelRollup(), postcss()],

  output: {
    // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file: "./lib/index.js", // 必须
    format: "esm", // 必须
    name: "antd-spin",
  },
};
