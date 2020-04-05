import { App } from "vue";
import Icon from "./src/icon.vue";
const install = function (app: App) {
  app.component(Icon.name, Icon);
};

export { install, Icon };
