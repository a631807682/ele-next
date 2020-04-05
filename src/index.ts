import { App } from "vue";
import Button from "packages/button";
import { ElementUIOptions } from "src/component";

const install = function (app: App, opts = {}) {
  app.component(Button.name, Button);

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  };
};
export { install, Button };
