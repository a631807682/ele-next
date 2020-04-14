import { App } from "vue";
import { install as Button } from "packages/button";
import { install as ButtonGroup } from "packages/button-group";
import { install as Icon } from "packages/icon";
import { install as Input } from "packages/input";
import { ElementUIOptions } from "src/component";

export const install = function (app: App, opts = {}) {
  app.use(Button);
  app.use(ButtonGroup);
  app.use(Icon);
  app.use(Input);

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  };
};

export * from "src/component";
export * from "packages/button";
export * from "packages/button-group";
export * from "packages/icon";
export * from "packages/input";
