import { App } from "vue";
import Button from "packages/button/src/button.vue";
import { ELEMENT_REF } from "main/compoment";

const install = function(app: App, opts = {}) {
  app.component(Button.name, Button);

  ELEMENT_REF.value = {
    ...ELEMENT_REF.value,
    ...opts
  };
};
export { install, Button };
