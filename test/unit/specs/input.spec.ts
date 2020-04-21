/**
 * @jest-environment jsdom-sixteen
 */
import { mountWithElement, waitImmediate } from '../util'
import { ref } from 'vue'

describe('Input', () => {
  it('create', async () => {
    let inputFocus = false
    const val = ref('val')
    const wrapper = mountWithElement({
      template: `
        <el-input
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
          @focus="handleFocus"
          v-model="val">
        </el-input>
      `,
      setup() {
        const handleFocus = () => {
          inputFocus = true
        }

        return { val, handleFocus }
      },
    })
    let input = wrapper.find<HTMLInputElement>('input')
    input.element.focus()
    expect(inputFocus).toEqual(true)
    expect(input.attributes('placeholder')).toEqual('请输入内容')
    expect(input.element.value).toEqual('val')
    expect(input.attributes('minlength')).toEqual('3')
    expect(input.attributes('maxlength')).toEqual('5')

    input.setValue('text')
    await waitImmediate()
    expect(input.element.value).toEqual('text')
  })

  it('default to empty', () => {
    const wrapper = mountWithElement({
      template: '<el-input/>',
    })
    let input = wrapper.find<HTMLInputElement>('input')
    expect(input.element.value).toEqual('')
  })

  it('disabled', () => {
    const wrapper = mountWithElement({
      template: `
          <el-input disabled>
          </el-input>
        `,
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('suffixIcon', () => {
    const wrapper = mountWithElement({
      template: `
          <el-input suffix-icon="time"></el-input>
        `,
    })
    const icon = wrapper.find('.el-input__icon')
    expect(icon.exists()).toBe(true)
  })

  it('prefixIcon', () => {
    const wrapper = mountWithElement({
      template: `
          <el-input prefix-icon="time"></el-input>
        `,
    })
    const icon = wrapper.find('.el-input__icon')
    expect(icon.exists()).toBe(true)
  })

  it('size', () => {
    const wrapper = mountWithElement({
      template: `
          <el-input size="large">
          </el-input>
        `,
    })

    expect(wrapper.classes('el-input--large')).toEqual(true)
  })

  it('type', () => {
    const wrapper = mountWithElement({
      template: `
          <el-input type="textarea">
          </el-input>
        `,
    })

    expect(wrapper.classes('el-textarea')).toEqual(true)
  })

  it('rows', () => {
    const wrapper = mountWithElement({
      template: `
          <el-input type="textarea" :rows="3">
          </el-input>
        `,
    })
    expect(wrapper.find('.el-textarea__inner').attributes('rows')).toEqual('3')
  })

  // Github issue #2836
  it('resize', async () => {
    const resize = ref('none')
    const wrapper = mountWithElement({
      template: `
          <div>
            <el-input type="textarea" :resize="resize"></el-input>
          </div>
        `,
      setup() {
        return { resize }
      },
    })

    const elInner = wrapper.find<HTMLElement>('.el-textarea__inner').element
    expect(elInner.style.resize).toEqual(resize.value)
    resize.value = 'horizontal'
    await waitImmediate()
    expect(elInner.style.resize).toEqual(resize.value)
  })

  it('autosize', async () => {
    let longText =
      'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd'

    const textareaValue = ref(longText)

    // jsdom doesn't do any actual rendering
    // maybe karma should be used
    // see: https://stackoverflow.com/questions/47823616/mocking-clientheight-and-scrollheight-in-react-enzyme-for-test?r=SearchResults
    jest
      .spyOn(Element.prototype, 'scrollHeight', 'get')
      .mockImplementation(function (this) {
        if (this.value === '') {
          return 31
        } else if (this.value === longText) {
          return 196
        } else {
          return 0
        }
      })

    const getComputedStyle = window.getComputedStyle
    jest
      .spyOn(window as any, 'getComputedStyle')
      .mockImplementation((ele: HTMLTextAreaElement) => {
        if (ele) {
          ele.style.paddingBottom = '5px'
          ele.style.paddingTop = '5px'
          ele.style.boxSizing = 'border-box'
          return getComputedStyle(ele)
        }
      })

    const wrapper = mountWithElement({
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
        return { textareaValue }
      },
    })

    await waitImmediate()
    const limitSizeInput = wrapper.vm.$refs.limitSize as any
    const limitlessSizeInput = wrapper.vm.$refs.limitlessSize as any
    await waitImmediate()
    expect(limitSizeInput.textareaStyle.height).toEqual('117px')
    expect(limitlessSizeInput.textareaStyle.height).toEqual('198px')

    textareaValue.value = ''
    await waitImmediate()
    expect(limitSizeInput.textareaStyle.height).toEqual('75px')
    expect(limitlessSizeInput.textareaStyle.height).toEqual('33px')
  })

  // it('focus', async () => {
  //   const mockFn = jest.fn()
  //   const input = ref(null)

  //   createVue({
  //     template: `
  //         <el-input ref="input" @focus="mockFn">
  //         </el-input>
  //       `,
  //     setup() {
  //       return {
  //         input,
  //         mockFn,
  //       }
  //     },
  //   })

  //   await waitImmediate()
  //   input.value.focus()
  //   await waitImmediate()
  //   expect(mockFn).toBeCalledTimes(1)
  // })

  // // TODO: need other component
  // // it("Input contains Select and append slot", async () => {
  // //   const input = ref(null);
  // //   const el = createVue({
  // //     template: `
  // //       <el-input v-model="value" clearable class="input-with-select" ref="input">
  // //         <el-select v-model="select" slot="prepend" placeholder="请选择">
  // //           <el-option label="餐厅名" value="1"></el-option>
  // //           <el-option label="订单号" value="2"></el-option>
  // //           <el-option label="用户电话" value="3"></el-option>
  // //         </el-select>
  // //         <el-button slot="append" icon="el-icon-search"></el-button>
  // //       </el-input>
  // //       `,
  // //     setup() {
  // //       const value = ref("1234");
  // //       const select = ref("1");
  // //       return {
  // //         input,
  // //         value,
  // //         select,
  // //       };
  // //     },
  // //   });
  // //   input.value.hovering = true;

  // //   await waitImmediate();
  // //   const suffixEl: HTMLElement = el.querySelector(
  // //     ".input-with-select > .el-input__suffix"
  // //   );
  // //   expect(suffixEl).toBeDefined();
  // //   expect(suffixEl.style.transform).toBeTruthy();
  // // });

  // //   it('validateEvent', async() => {
  // //     const spy = sinon.spy();
  // //     vm = createVue({
  // //       template: `
  // //         <el-form :model="model" :rules="rules">
  // //           <el-form-item prop="input">
  // //             <el-input v-model="model.input" :validate-event="false">
  // //             </el-input>
  // //           </el-form-item>
  // //         </el-form>
  // //       `,
  // //       data() {
  // //         const validator = (rule, value, callback) => {
  // //           spy();
  // //           callback();
  // //         };
  // //         return {
  // //           model: {
  // //             input: ''
  // //           },
  // //           rules: {
  // //             input: [
  // //               { validator }
  // //             ]
  // //           }
  // //         };
  // //       }
  // //     }, true);

  // //     vm.model.input = '123';
  // //     await waitImmediate();
  // //     expect(spy.called).to.be.false;
  // //   });

  // describe('Input Events', () => {
  //   it('event:focus & blur', async () => {
  //     const mockFocus = jest.fn()
  //     const mockBlur = jest.fn()

  //     const el = createVue({
  //       template: `
  //           <el-input
  //             placeholder="请输入内容"
  //             value="input"
  //             @focus="mockFocus"
  //             @blur="mockBlur">
  //           </el-input>
  //         `,
  //       setup() {
  //         return {
  //           mockFocus,
  //           mockBlur,
  //         }
  //       },
  //     })

  //     // vm.$refs.input.$on("focus", spyFocus);
  //     // vm.$refs.input.$on("blur", spyBlur);
  //     el.querySelector('input').focus()
  //     el.querySelector('input').blur()

  //     await waitImmediate()
  //     expect(mockFocus).toBeCalledTimes(1)
  //     expect(mockBlur).toBeCalledTimes(1)
  //   })

  //   it('event:change', async () => {
  //     // NOTE: should be same as native's change behavior
  //     const mockChange = jest.fn()
  //     const el = createVue({
  //       template: `
  //           <el-input
  //             placeholder="请输入内容"
  //             v-model="value"
  //             @change="mockChange">
  //           </el-input>
  //         `,
  //       data() {
  //         const value = ref('')
  //         return {
  //           value,
  //           mockChange,
  //         }
  //       },
  //     })

  //     const inputElm = el.querySelector('input')
  //     const simulateEvent = (text, event) => {
  //       inputElm.value = text
  //       inputElm.dispatchEvent(new Event(event))
  //     }

  //     // simplified test, component should emit change when native does
  //     simulateEvent('1', 'input')
  //     simulateEvent('2', 'change')
  //     await waitImmediate()

  //     expect(mockChange).toBeCalledTimes(1)
  //     expect(mockChange).toBeCalledWith('2')
  //   })
  //   it('event:clear', async () => {
  //     const mockClear = jest.fn()
  //     const el = createVue({
  //       template: `
  //           <el-input
  //             placeholder="请输入内容"
  //             clearable
  //             v-model="value"
  //             @clear="mockClear">
  //           </el-input>
  //         `,
  //       setup() {
  //         const value = ref('a')
  //         return {
  //           value,
  //           mockClear,
  //         }
  //       },
  //     })

  //     const inputElm = el.querySelector('input')

  //     // focus to show clear button
  //     inputElm.focus()

  //     await waitImmediate()
  //     ;(el.querySelector('.el-input__clear') as HTMLElement).click()
  //     await waitImmediate()
  //     expect(mockClear).toBeCalledTimes(1)
  //   })

  //   it('event:input', async () => {
  //     const mockInput = jest.fn()
  //     const value = ref('a')
  //     const el = createVue({
  //       template: `
  //           <el-input
  //             placeholder="请输入内容"
  //             clearable
  //             v-model="value"
  //             @input="mockInput">
  //           </el-input>
  //         `,
  //       setup() {
  //         return {
  //           value,
  //           mockInput,
  //         }
  //       },
  //     })

  //     const nativeInput = el.querySelector('input')
  //     nativeInput.value = '1'
  //     triggerEvent(nativeInput, 'compositionstart')
  //     triggerEvent(nativeInput, 'input')
  //     await waitImmediate()
  //     nativeInput.value = '2'
  //     triggerEvent(nativeInput, 'compositionupdate')
  //     triggerEvent(nativeInput, 'input')
  //     await waitImmediate()
  //     triggerEvent(nativeInput, 'compositionend')
  //     await waitImmediate()
  //     // input event does not fire during composition
  //     expect(mockInput).toBeCalledTimes(1)
  //     // TODO: to know for what
  //     // native input value is controlled
  //     // expect(value.value).toEqual('a')
  //     // expect(nativeInput.value).toEqual('a')
  //   })
  // })

  // describe('Input Methods', () => {
  //   it('method:select', async () => {
  //     const testContent = 'test'
  //     const inputComp = ref(null)
  //     const el = createVue({
  //       template: `
  //         <el-input
  //           ref="inputComp"
  //           v-model="value"
  //         />
  //       `,
  //       setup() {
  //         const value = ref(testContent)
  //         return {
  //           value,
  //           inputComp,
  //         }
  //       },
  //     })
  //     await waitImmediate()
  //     let input = el.querySelector('input')
  //     expect(input.selectionStart).toEqual(testContent.length)
  //     expect(input.selectionEnd).toEqual(testContent.length)
  //     inputComp.value.select()
  //     await waitImmediate()
  //     expect(input.selectionStart).toEqual(0)
  //     expect(input.selectionEnd).toEqual(testContent.length)
  //   })
  // })

  // it('sets value on textarea / input type change', async () => {
  //   const type = ref('text')
  //   const val = ref('123')
  //   const el = createVue({
  //     template: `
  //       <el-input :type="type" v-model="val" />
  //     `,
  //     setup() {
  //       return {
  //         type,
  //         val,
  //       }
  //     },
  //   })

  //   expect(el.querySelector('input').value).toEqual('123')
  //   type.value = 'textarea'
  //   await waitImmediate()
  //   expect(el.querySelector('textarea').value).toEqual('123')
  //   type.value = 'password'
  //   await waitImmediate()
  //   expect(el.querySelector('input').value).toEqual('123')
  // })

  // it('limit input and show word count', async () => {
  //   const show = ref(false)
  //   const value4 = ref('exceed')
  //   const inputText = ref(null)
  //   const inputTextarea = ref(null)
  //   const inputPassword = ref(null)
  //   const inputInitialExceed = ref(null)

  //   createVue({
  //     template: `
  //       <div>
  //         <el-input
  //           ref="inputText"
  //           type="text"
  //           v-model="value1"
  //           maxlength="10"
  //           :show-word-limit="show">
  //         </el-input>
  //         <el-input
  //           ref="inputTextarea"
  //           type="textarea"
  //           v-model="value2"
  //           maxlength="10"
  //           show-word-limit>
  //         </el-input>
  //         <el-input
  //           ref="inputPassword"
  //           type="password"
  //           v-model="value3"
  //           maxlength="10"
  //           show-word-limit>
  //         </el-input>
  //         <el-input
  //           ref="inputInitialExceed"
  //           type="text"
  //           v-model="value4"
  //           maxlength="2"
  //           show-word-limit>
  //         </el-input>
  //       </div>
  //     `,
  //     setup() {
  //       return {
  //         value1: '',
  //         value2: '',
  //         value3: '',
  //         value4,
  //         show,
  //         inputText,
  //         inputTextarea,
  //         inputPassword,
  //         inputInitialExceed,
  //       }
  //     },
  //   })

  //   await waitImmediate()
  //   const elText = inputText.value.$el
  //   const elTextarea = inputTextarea.value.$el
  //   const elPassword = inputPassword.value.$el
  //   const InitialExceed = inputInitialExceed.value.$el

  //   expect(elText.querySelectorAll('.el-input__count').length).toEqual(0)
  //   expect(elTextarea.querySelectorAll('.el-input__count').length).toEqual(1)
  //   expect(elPassword.querySelectorAll('.el-input__count').length).toEqual(0)
  //   expect(InitialExceed.classList.contains('is-exceed')).toEqual(true)

  //   show.value = true
  //   await waitImmediate()
  //   expect(elText.querySelectorAll('.el-input__count').length).toEqual(1)

  //   value4.value = '1'
  //   await waitImmediate()
  //   expect(elText.classList.contains('is-exceed')).toEqual(false)
  // })
})
