import { App } from "vue";
import Button from "packages/button/src/button.vue";
const install = function(app: App, opts = {}) {
  app.component(Button.name, Button);

  // will be support in alpha.11
  // app.config.globalProperties.$ELEMENT = {
  //   size: opts.size || "",
  //   zIndex: opts.zIndex || 2000
  // };
};
export { install, Button };
