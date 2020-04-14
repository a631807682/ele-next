// vue-shim.d.ts
// see: https://github.com/vuejs/vue-next-webpack-preview/issues/5
declare module "*.vue" {
  import { ComponentOptions } from "@vue/runtime-dom";
  const comp: ComponentOptions;
  export default comp;
}
