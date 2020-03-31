import Button from "../packages/button/index.js";
const install = function(app, opts = {}) {
  app.component(Button.name, Button);

  // will be support in alpha.11
  // app.config.globalProperties.$ELEMENT = {
  //   size: opts.size || "",
  //   zIndex: opts.zIndex || 2000
  // };
};
export { install, Button };
