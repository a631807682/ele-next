import { App } from "vue";
import * as Button from "packages/button";
import { ElementUIOptions } from "src/component";

const install = function (app: App, opts = {}) {
  app.use(Button);

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  };
};
export { install, Button };
