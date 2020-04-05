import { App } from "vue";
import Button from "./src/button.vue";
const install = function (app: App) {
  app.component(Button.name, Button);
};

export { install, Button };
