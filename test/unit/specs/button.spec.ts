import { createTest, createVue, waitImmediate } from "../util";
import { mockWarn } from "@vue/shared";
import { Button } from "packages/button";

describe("Button", () => {
  mockWarn();

  it("create", () => {
    const el = createTest(Button, {
      type: "primary",
    });
    expect(el.classList.contains("el-button--primary")).toBe(true);
  });

  it("icon", () => {
    const el = createTest(Button, {
      icon: "el-icon-search",
    });
    expect(el.querySelector(".el-icon-search")).toBeDefined();
  });

  it("nativeType", () => {
    const el = createTest(Button, {
      nativeType: "submit",
    });

    expect(el.getAttribute("type")).toEqual("submit");
  });

  it("loading", () => {
    const el = createTest(Button, {
      loading: true,
    });
    expect(el.classList.contains("is-loading")).toBe(true);
    expect(el.querySelector(".el-icon-loading")).toBeDefined();
  });

  it("disabled", () => {
    const el = createTest(Button, {
      disabled: true,
    });
    expect(el.classList.contains("is-disabled")).toBe(true);
  });

  it("size", () => {
    const el = createTest(Button, {
      size: "medium",
    });
    expect(el.classList.contains("el-button--medium")).toBe(true);
  });

  it("plain", () => {
    const el = createTest(Button, {
      plain: true,
    });
    expect(el.classList.contains("is-plain")).toBe(true);
  });

  it("round", () => {
    const el = createTest(Button, {
      round: true,
    });
    expect(el.classList.contains("is-round")).toBe(true);
  });

  it("circle", () => {
    const el = createTest(Button, {
      circle: true,
    });
    expect(el.classList.contains("is-circle")).toBe(true);
  });

  it("click", async () => {
    let result;
    const el = createVue({
      template: `
          <el-button @click="handleClick"></el-button>
        `,
      setup() {
        function handleClick(evt) {
          result = evt;
        }
        return {
          handleClick,
        };
      },
    });
    (el as HTMLElement).click();

    await waitImmediate();
    expect(result).toBeDefined();
  });

  it("click inside", async () => {
    let result;
    const el = createVue({
      template: `
          <el-button @click="handleClick"><span class="inner-slot"></span></el-button>
        `,
      setup() {
        function handleClick(evt) {
          result = evt;
        }
        return {
          handleClick,
        };
      },
    });
    (el.querySelector(".inner-slot") as HTMLElement).click();

    await waitImmediate();
    expect(result).toBeDefined();
  });

  it("loading implies disabled", async () => {
    let result;
    const el = createVue({
      template: `
        <el-button loading @click="handleClick"></el-button>
        `,
      setup() {
        function handleClick(evt) {
          result = evt;
        }
        return {
          handleClick,
        };
      },
    });
    (el as HTMLElement).click();
    await waitImmediate();
    expect(result).toBeUndefined();
  });
});
