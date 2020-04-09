import { App } from "vue";
import * as Button from "packages/button";
import * as ButtonGroup from "packages/button-group";
import * as Icon from "packages/icon";
import * as Input from "packages/input";
import { ElementUIOptions } from "src/component";

const install = function (app: App, opts = {}) {
  app.use(Button);
  app.use(ButtonGroup);
  app.use(Icon);
  app.use(Input);

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  };
};
export { install, Button };
