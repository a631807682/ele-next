// vue-shim.d.ts
declare module "*.vue" {
  import { ComponentOptions } from "@vue/runtime-dom";
  const app: ComponentOptions;
  export default app;
}
