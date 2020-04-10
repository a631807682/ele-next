import { createVue, waitImmediate } from "../util";
import { mockWarn } from "@vue/shared";
import { ref, onMounted } from "vue";

describe("Input", () => {
  mockWarn();
  it("create", async () => {
    let inputFocus = false;
    const input = ref("input");
    const el = createVue({
      template: `
        <el-input
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
          @focus="handleFocus"
          v-model="input">
        </el-input>
      `,
      setup() {
        const handleFocus = () => {
          inputFocus = true;
        };

        return { input, handleFocus };
      },
    });
    let inputElm = el.querySelector("input");
    inputElm.focus();
    expect(inputFocus).toEqual(true);
    expect(inputElm.getAttribute("placeholder")).toEqual("请输入内容");
    expect(inputElm.value).toEqual("input");
    expect(inputElm.getAttribute("minlength")).toEqual("3");
    expect(inputElm.getAttribute("maxlength")).toEqual("5");

    input.value = "text";
    await waitImmediate();
    expect(inputElm.value).toEqual("text");
  });

  it("default to empty", () => {
    const el = createVue({
      template: "<el-input/>",
    });
    let inputElm = el.querySelector("input");
    expect(inputElm.value).toEqual("");
  });

  it("disabled", () => {
    const el = createVue({
      template: `
          <el-input disabled>
          </el-input>
        `,
    });
    expect(el.querySelector("input").getAttribute("disabled")).toBeDefined();
  });

  it("suffixIcon", () => {
    const el = createVue({
      template: `
          <el-input suffix-icon="time"></el-input>
        `,
    });
    let icon = el.querySelector(".el-input__icon");
    expect(icon).toBeDefined();
  });

  it("prefixIcon", () => {
    const el = createVue({
      template: `
          <el-input prefix-icon="time"></el-input>
        `,
    });
    var icon = el.querySelector(".el-input__icon");
    expect(icon).toBeDefined();
  });

  it("size", () => {
    const el = createVue({
      template: `
          <el-input size="large">
          </el-input>
        `,
    });

    expect(el.classList.contains("el-input--large")).toEqual(true);
  });

  it("type", () => {
    const el = createVue({
      template: `
          <el-input type="textarea">
          </el-input>
        `,
    });

    expect(el.classList.contains("el-textarea")).toEqual(true);
  });

  it("rows", () => {
    const el = createVue({
      template: `
          <el-input type="textarea" :rows="3">
          </el-input>
        `,
    });
    expect(
      el.querySelector(".el-textarea__inner").getAttribute("rows")
    ).toEqual("3");
  });

  // Github issue #2836
  it("resize", async () => {
    const resize = ref("none");
    const el = createVue({
      template: `
          <div>
            <el-input type="textarea" :resize="resize"></el-input>
          </div>
        `,
      setup() {
        return { resize };
      },
    });
    await waitImmediate();
    const elInner = el.querySelector(".el-textarea__inner") as HTMLElement;
    expect(elInner.style.resize).toEqual(resize.value);
    resize.value = "horizontal";
    await waitImmediate();
    expect(elInner.style.resize).toEqual(resize.value);
  });

  it("autosize", async () => {
    let limitSizeInput;
    let limitlessSizeInput;
    let longText =
      "sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd";

    const textareaValue = ref(longText);

    // jsdom doesn't do any actual rendering
    // maybe karma should be used
    // see: https://stackoverflow.com/questions/47823616/mocking-clientheight-and-scrollheight-in-react-enzyme-for-test?r=SearchResults
    jest
      .spyOn(Element.prototype, "scrollHeight", "get")
      .mockImplementation(function (this) {
        if (this.value === "") {
          return 31;
        } else if (this.value === longText) {
          return 196;
        } else {
          return 0;
        }
      });

    const getComputedStyle = window.getComputedStyle;
    jest
      .spyOn(window as any, "getComputedStyle")
      .mockImplementation((ele: HTMLTextAreaElement) => {
        if (ele) {
          ele.style.paddingBottom = "5px";
          ele.style.paddingTop = "5px";
          ele.style.boxSizing = "border-box";
          return getComputedStyle(ele);
        }
      });

    createVue({
      template: `
          <div>
            <el-input
              ref="limitSize"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
              v-model="textareaValue"
            >
            </el-input>
            <el-input
              ref="limitlessSize"
              type="textarea"
              autosize
              v-model="textareaValue"
            >
            </el-input>
          </div>
        `,
      setup() {
        const limitSize = ref(null);
        const limitlessSize = ref(null);
        onMounted(() => {
          limitSizeInput = limitSize.value;
          limitlessSizeInput = limitlessSize.value;
        });
        return { textareaValue, limitSize, limitlessSize };
      },
    });

    await waitImmediate();
    expect(limitSizeInput.textareaStyle.height).toEqual("117px");
    expect(limitlessSizeInput.textareaStyle.height).toEqual("198px");

    textareaValue.value = "";
    await waitImmediate();
    expect(limitSizeInput.textareaStyle.height).toEqual("75px");
    expect(limitlessSizeInput.textareaStyle.height).toEqual("33px");
  });

  //   it('focus', async() => {
  //     vm = createVue({
  //       template: `
  //         <el-input ref="input">
  //         </el-input>
  //       `
  //     }, true);

  //     const spy = sinon.spy();

  //     vm.$refs.input.$on('focus', spy);
  //     vm.$refs.input.focus();

  //     await waitImmediate();
  //     expect(spy.calledOnce).to.be.true;
  //   });

  //   it('Input contains Select and append slot', async() => {
  //     vm = createVue({
  //       template: `
  //       <el-input v-model="value" clearable class="input-with-select" ref="input">
  //         <el-select v-model="select" slot="prepend" placeholder="请选择">
  //           <el-option label="餐厅名" value="1"></el-option>
  //           <el-option label="订单号" value="2"></el-option>
  //           <el-option label="用户电话" value="3"></el-option>
  //         </el-select>
  //         <el-button slot="append" icon="el-icon-search"></el-button>
  //       </el-input>
  //       `,
  //       data() {
  //         return {
  //           value: '1234',
  //           select: '1'
  //         };
  //       }
  //     }, true);
  //     vm.$refs.input.hovering = true;

  //     await wait();
  //     const suffixEl = document.querySelector('.input-with-select > .el-input__suffix');
  //     expect(suffixEl).to.not.be.null;
  //     expect(suffixEl.style.transform).to.not.be.empty;
  //   });

  //   it('validateEvent', async() => {
  //     const spy = sinon.spy();
  //     vm = createVue({
  //       template: `
  //         <el-form :model="model" :rules="rules">
  //           <el-form-item prop="input">
  //             <el-input v-model="model.input" :validate-event="false">
  //             </el-input>
  //           </el-form-item>
  //         </el-form>
  //       `,
  //       data() {
  //         const validator = (rule, value, callback) => {
  //           spy();
  //           callback();
  //         };
  //         return {
  //           model: {
  //             input: ''
  //           },
  //           rules: {
  //             input: [
  //               { validator }
  //             ]
  //           }
  //         };
  //       }
  //     }, true);

  //     vm.model.input = '123';
  //     await waitImmediate();
  //     expect(spy.called).to.be.false;
  //   });

  //   describe('Input Events', () => {
  //     it('event:focus & blur', async() => {
  //       vm = createVue({
  //         template: `
  //           <el-input
  //             ref="input"
  //             placeholder="请输入内容"
  //             value="input">
  //           </el-input>
  //         `
  //       }, true);

  //       const spyFocus = sinon.spy();
  //       const spyBlur = sinon.spy();

  //       vm.$refs.input.$on('focus', spyFocus);
  //       vm.$refs.input.$on('blur', spyBlur);
  //       vm.$el.querySelector('input').focus();
  //       vm.$el.querySelector('input').blur();

  //       await waitImmediate();
  //       expect(spyFocus.calledOnce).to.be.true;
  //       expect(spyBlur.calledOnce).to.be.true;
  //     });
  //     it('event:change', async() => {
  //       // NOTE: should be same as native's change behavior
  //       vm = createVue({
  //         template: `
  //           <el-input
  //             ref="input"
  //             placeholder="请输入内容"
  //             :value="input">
  //           </el-input>
  //         `,
  //         data() {
  //           return {
  //             input: 'a'
  //           };
  //         }
  //       }, true);

  //       const inputElm = vm.$el.querySelector('input');
  //       const simulateEvent = (text, event) => {
  //         inputElm.value = text;
  //         inputElm.dispatchEvent(new Event(event));
  //       };

  //       const spy = sinon.spy();
  //       vm.$refs.input.$on('change', spy);

  //       // simplified test, component should emit change when native does
  //       simulateEvent('1', 'input');
  //       simulateEvent('2', 'change');
  //       await waitImmediate();
  //       expect(spy.calledWith('2')).to.be.true;
  //       expect(spy.calledOnce).to.be.true;
  //     });
  //     it('event:clear', async() => {
  //       vm = createVue({
  //         template: `
  //           <el-input
  //             ref="input"
  //             placeholder="请输入内容"
  //             clearable
  //             :value="input">
  //           </el-input>
  //         `,
  //         data() {
  //           return {
  //             input: 'a'
  //           };
  //         }
  //       }, true);

  //       const spyClear = sinon.spy();
  //       const inputElm = vm.$el.querySelector('input');

  //       // focus to show clear button
  //       inputElm.focus();
  //       vm.$refs.input.$on('clear', spyClear);
  //       await waitImmediate();
  //       vm.$el.querySelector('.el-input__clear').click();
  //       await waitImmediate();
  //       expect(spyClear.calledOnce).to.be.true;
  //     });
  //     it('event:input', async() => {
  //       vm = createVue({
  //         template: `
  //           <el-input
  //             ref="input"
  //             placeholder="请输入内容"
  //             clearable
  //             :value="input">
  //           </el-input>
  //         `,
  //         data() {
  //           return {
  //             input: 'a'
  //           };
  //         }
  //       }, true);
  //       const spy = sinon.spy();
  //       vm.$refs.input.$on('input', spy);
  //       const nativeInput = vm.$refs.input.$el.querySelector('input');
  //       nativeInput.value = '1';
  //       triggerEvent(nativeInput, 'compositionstart');
  //       triggerEvent(nativeInput, 'input');
  //       await waitImmediate();
  //       nativeInput.value = '2';
  //       triggerEvent(nativeInput, 'compositionupdate');
  //       triggerEvent(nativeInput, 'input');
  //       await waitImmediate();
  //       triggerEvent(nativeInput, 'compositionend');
  //       await waitImmediate();
  //       // input event does not fire during composition
  //       expect(spy.calledOnce).to.be.true;
  //       // native input value is controlled
  //       expect(vm.input).to.equal('a');
  //       expect(nativeInput.value).to.equal('a');

  //     });
  //   });

  //   describe('Input Methods', () => {
  //     it('method:select', async() => {
  //       const testContent = 'test';

  //       vm = createVue({
  //         template: `
  //           <el-input
  //             ref="inputComp"
  //             value="${testContent}"
  //           />
  //         `
  //       }, true);

  //       expect(vm.$refs.inputComp.$refs.input.selectionStart).to.equal(testContent.length);
  //       expect(vm.$refs.inputComp.$refs.input.selectionEnd).to.equal(testContent.length);

  //       vm.$refs.inputComp.select();

  //       await waitImmediate();
  //       expect(vm.$refs.inputComp.$refs.input.selectionStart).to.equal(0);
  //       expect(vm.$refs.inputComp.$refs.input.selectionEnd).to.equal(testContent.length);
  //     });
  //   });

  //   it('sets value on textarea / input type change', async() => {
  //     vm = createVue({
  //       template: `
  //         <el-input :type="type" v-model="val" />
  //       `,
  //       data() {
  //         return {
  //           type: 'text',
  //           val: '123'
  //         };
  //       }
  //     }, true);

  //     expect(vm.$el.querySelector('input').value).to.equal('123');
  //     vm.type = 'textarea';
  //     await waitImmediate();
  //     expect(vm.$el.querySelector('textarea').value).to.equal('123');
  //     vm.type = 'password';
  //     await waitImmediate();
  //     expect(vm.$el.querySelector('input').value).to.equal('123');
  //   });

  //   it('limit input and show word count', async() => {
  //     vm = createVue({
  //       template: `
  //         <div>
  //           <el-input
  //             class="test-text"
  //             type="text"
  //             v-model="input1"
  //             maxlength="10"
  //             :show-word-limit="show">
  //           </el-input>
  //           <el-input
  //             class="test-textarea"
  //             type="textarea"
  //             v-model="input2"
  //             maxlength="10"
  //             show-word-limit>
  //           </el-input>
  //           <el-input
  //             class="test-password"
  //             type="password"
  //             v-model="input3"
  //             maxlength="10"
  //             show-word-limit>
  //           </el-input>
  //           <el-input
  //             class="test-initial-exceed"
  //             type="text"
  //             v-model="input4"
  //             maxlength="2"
  //             show-word-limit>
  //           </el-input>
  //         </div>
  //       `,
  //       data() {
  //         return {
  //           input1: '',
  //           input2: '',
  //           input3: '',
  //           input4: 'exceed',
  //           show: false
  //         };
  //       }
  //     }, true);

  //     const inputElm1 = vm.$el.querySelector('.test-text');
  //     const inputElm2 = vm.$el.querySelector('.test-textarea');
  //     const inputElm3 = vm.$el.querySelector('.test-password');
  //     const inputElm4 = vm.$el.querySelector('.test-initial-exceed');

  //     expect(inputElm1.querySelectorAll('.el-input__count').length).to.equal(0);
  //     expect(inputElm2.querySelectorAll('.el-input__count').length).to.equal(1);
  //     expect(inputElm3.querySelectorAll('.el-input__count').length).to.equal(0);
  //     expect(inputElm4.classList.contains('is-exceed')).to.true;

  //     vm.show = true;
  //     await waitImmediate();
  //     expect(inputElm1.querySelectorAll('.el-input__count').length).to.equal(1);

  //     vm.input4 = '1';
  //     await waitImmediate();
  //     expect(inputElm4.classList.contains('is-exceed')).to.false;
  //   });
});
