import { App } from "vue";
import ButtonGroup from "../button/src/button-group.vue";
const install = function (app: App) {
  app.component(ButtonGroup.name, ButtonGroup);
};

export { install, ButtonGroup };
