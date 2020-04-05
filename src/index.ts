import { App } from "vue";
import Button from "packages/button";
import { ELEMENT_REF } from "src/component";

const install = function (app: App, opts = {}) {
  app.component(Button.name, Button);

  ELEMENT_REF.value = {
    ...ELEMENT_REF.value,
    ...opts,
  };
};
export { install, Button };
