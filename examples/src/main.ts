import { createApp } from "vue";
import App from "./App.vue";
import * as Element from "src";
import "packages/theme-chalk/src/index.scss";

let VueApp = createApp(App);
VueApp.use(Element, {
  // size: "mini",
});
VueApp.mount("#app");
