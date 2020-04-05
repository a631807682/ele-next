const path = require("path");

exports.alias = {
  // this isn't technically needed, since the default `vue` entry for bundlers
  // is a simple `export * from '@vue/runtime-dom`. However having this
  // extra re-export somehow causes webpack to always invalidate the module
  // on the first HMR update and causes the page to reload.
  vue: "@vue/runtime-dom",
  src: path.resolve(__dirname, "../src"),
  packages: path.resolve(__dirname, "../packages"),
  examples: path.resolve(__dirname, "../examples"),
  "element-ui": path.resolve(__dirname, "../")
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
