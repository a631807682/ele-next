import { mountWithElement, waitImmediate, triggerEvent } from '../util'
import { ref, ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

describe('InputNumber', () => {
  it('create', () => {
    const val = ref(1)
    const wrapper = mountWithElement({
      template: `
            <el-input-number v-model="val">
            </el-input-number>
            `,
      setup() {
        return {
          val,
        }
      },
    })
    let input = wrapper.find('input')
    expect(input.element.value).toEqual('1')
  })

  it('decrease', async () => {
    const val = ref(5)
    const wrapper = mountWithElement({
      template: `
              <el-input-number v-model="val">
              </el-input-number>
              `,
      setup() {
        return {
          val,
        }
      },
    })
    let input = wrapper.find('input')
    let btnDecrease = wrapper.find('.el-input-number__decrease')
    await btnDecrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()

    expect(val.value).toEqual(4)
    expect(input.element.value).toEqual('4')
  })

  it('increase', async () => {
    const val = ref(1.5)
    const wrapper = mountWithElement({
      template: `
              <el-input-number v-model="val">
              </el-input-number>
              `,
      setup() {
        return {
          val,
        }
      },
    })

    let input = wrapper.find('input')
    let btnIncrease = wrapper.find('.el-input-number__increase')
    await btnIncrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()

    expect(val.value).toEqual(2.5)
    expect(input.element.value).toEqual('2.5')
  })

  it('disabled', async () => {
    const val = ref(2)
    const wrapper = mountWithElement({
      template: `
              <el-input-number v-model="val" disabled>
              </el-input-number>
              `,
      setup() {
        return {
          val,
        }
      },
    })

    let input = wrapper.find('input')
    let btnDecrease = wrapper.find('.el-input-number__decrease')
    let btnIncrease = wrapper.find('.el-input-number__increase')

    await btnDecrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val.value).toEqual(2)
    expect(input.element.value).toEqual('2')

    await btnIncrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val.value).toEqual(2)
    expect(input.element.value).toEqual('2')
  })

  it('step', async () => {
    const val = ref(5)
    const wrapper = mountWithElement({
      template: `
              <el-input-number v-model="val" :step="1.2">
              </el-input-number>
              `,
      setup() {
        return {
          val,
        }
      },
    })

    let input = wrapper.find('input')
    let btnDecrease = wrapper.find('.el-input-number__decrease')
    let btnIncrease = wrapper.find('.el-input-number__increase')

    await btnDecrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val.value).toEqual(3.8)
    expect(input.element.value).toEqual('3.8')

    await btnDecrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val.value).toEqual(2.6)
    expect(input.element.value).toEqual('2.6')

    await btnIncrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val.value).toEqual(3.8)
    expect(input.element.value).toEqual('3.8')
  })

  it('step strictly', async () => {
    const val = ref(5)
    const wrapper = mountWithElement({
      template: `
              <el-input-number v-model="val" :step="1.2" step-strictly>
              </el-input-number>
              `,
      setup() {
        return {
          val,
        }
      },
    })

    let input = wrapper.find('input')
    await waitImmediate()
    expect(val.value).toEqual(4.8)
    expect(input.element.value).toEqual('4.8')

    val.value = 8
    await waitImmediate()
    expect(val.value).toEqual(8.4)
    expect(input.element.value).toEqual('8.4')
  })

  it('min', async () => {
    const val1 = ref(6)
    const wrapper1 = mountWithElement({
      template: `
              <el-input-number v-model="val1" :min="6">
              </el-input-number>
              `,
      setup() {
        return {
          val1,
        }
      },
    })

    const val2 = ref(3)
    const wrapper2 = mountWithElement({
      template: `
                <el-input-number v-model="val2" :min="6">
                </el-input-number>
                `,
      setup() {
        return {
          val2,
        }
      },
    })

    let input2 = wrapper2.find('input')
    expect(val2.value === 6)
    expect(input2.element.value).toEqual('6')

    let input1 = wrapper1.find('input')
    let btnDecrease = wrapper1.find('.el-input-number__decrease')

    btnDecrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val1.value === 6)
    expect(input1.element.value).toEqual('6')
  })

  it('max', async () => {
    const val1 = ref(6)
    const wrapper1 = mountWithElement({
      template: `
              <el-input-number v-model="val1" :max="6">
              </el-input-number>
              `,
      setup() {
        return {
          val1,
        }
      },
    })

    const val2 = ref(8)
    const wrapper2 = mountWithElement({
      template: `
                <el-input-number v-model="val2" :max="6">
                </el-input-number>
                `,
      setup() {
        return {
          val2,
        }
      },
    })

    let input2 = wrapper2.find('input')
    expect(val2.value === 6)
    expect(input2.element.value).toEqual('6')

    let input1 = wrapper1.find('input')
    let btnIncrease = wrapper1.find('.el-input-number__increase')

    btnIncrease.trigger('mousedown')
    triggerEvent(document, 'mouseup')
    await waitImmediate()
    expect(val1.value === 6)
    expect(input1.element.value).toEqual('6')
  })

  describe('precision', () => {
    it('precision is 2', () => {
      const val = ref(6.999)
      const wrapper = mountWithElement({
        template: `
            <el-input-number v-model="val" :max="8" :precision="2">
            </el-input-number>
                  `,
        setup() {
          return {
            val,
          }
        },
      })

      expect(val.value === 7)
      let input = wrapper.find('input')
      expect(input.element.value).toEqual('7.00')
    })

    it('precision greater than the precision of step', async () => {
      const val = ref(6.999)
      const wrapper = mountWithElement({
        template: `
            <el-input-number v-model="val" :max="8" :precision="0" :step="0.1">
            </el-input-number>
                    `,
        setup() {
          return {
            val,
          }
        },
      })
      let input = wrapper.find('input')
      let btnIncrease = wrapper.find('.el-input-number__increase')

      expect(val.value === 7)
      expect(input.element.value).toEqual('7')

      btnIncrease.trigger('mousedown')
      triggerEvent(document, 'mouseup')

      await waitImmediate()
      expect(val.value === 7)
      expect(input.element.value).toEqual('7')
    })
  })

  it('controls', () => {
    const val = ref(8)
    const wrapper = mountWithElement({
      template: `
            <el-input-number :controls="false" v-model="val" :max="8">
            </el-input-number>
            `,
      setup() {
        return {
          val,
        }
      },
    })

    expect(wrapper.find('.el-input-number__decrease').exists()).toEqual(false)
    expect(wrapper.find('.el-input-number__increase').exists()).toEqual(false)
  })
  it('invalid value reset', async () => {
    const val = ref(8)
    const wrapper = mountWithElement({
      template: `
            <el-input-number v-model="val" :min="5" :max="10">
            </el-input-number>
            `,
      setup() {
        return {
          val,
        }
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'ElInputNumber' })
    val.value = 100
    await waitImmediate()
    expect((inputNumber.vm as any).currentValue).toEqual(10)

    val.value = 4
    await waitImmediate()
    expect((inputNumber.vm as any).currentValue).toEqual(5)

    // @ts-ignore
    val.value = 'dsajkhd'
    await waitImmediate()
    expect((inputNumber.vm as any).currentValue).toEqual(5)
  })

  describe('event:change', () => {
    let mockChange: jest.Mock
    let vm: any
    let wrapper: VueWrapper<ComponentPublicInstance>

    beforeEach(() => {
      const val = ref(2)
      mockChange = jest.fn()
      wrapper = mountWithElement({
        template: `
          <el-input-number v-model="val" ref="compo" :min='2' :max='3' :step='1' @change="mockChange">
          </el-input-number>
                `,
        setup() {
          return {
            val,
            mockChange,
          }
        },
      })
      const inputNumber = wrapper.findComponent({ name: 'ElInputNumber' })
      vm = inputNumber.vm
    })

    it('emit on input', async () => {
      vm.handleInputChange('3')
      await waitImmediate()
      expect(mockChange).toBeCalledTimes(1)
      expect(mockChange).toBeCalledWith(3, 2)
    })

    it('emit on button', async () => {
      const btnIncrease = wrapper.find('.el-input-number__increase')
      btnIncrease.trigger('mousedown')
      triggerEvent(document, 'mouseup')
      await waitImmediate()
      expect(mockChange).toBeCalledTimes(1)
      expect(mockChange).toBeCalledWith(3, 2)
    })

    it('does not emit on programatic change', async () => {
      vm.userInput = 3
      await waitImmediate()
      expect(mockChange).toBeCalledTimes(0)
    })

    it('event:focus & blur', async () => {
      const inputEl = wrapper.find('input').element
      const mockBlur = jest.fn()
      const mockFocus = jest.fn()

      inputEl.onfocus = mockFocus
      inputEl.onblur = mockBlur

      inputEl.focus()
      inputEl.blur()
      await waitImmediate()
      expect(mockFocus).toBeCalledTimes(1)
      expect(mockBlur).toBeCalledTimes(1)
    })
  })
  //   // can not test by jsdom
  //   describe('InputNumber Methods', () => {
  //     it('method:select', (done) => {
  //       const val = ref('123')
  //       const wrapper = mountWithElement({
  //         template: `
  //             <el-input-number v-model="val" >
  //             </el-input-number>
  //                   `,
  //         setup() {
  //           return {
  //             val,
  //           }
  //         },
  //       })
  //       const inputEl = wrapper.find('input').element
  //       expect(inputEl.selectionStart).toEqual(val.value.length)
  //       expect(inputEl.selectionEnd).toEqual(val.value.length)

  //       const inputVm = wrapper.findComponent({ name: 'ElInput' }).vm as any
  //       inputVm.select()
  //       expect(inputEl.selectionStart).toEqual(0)
  //       expect(inputEl.selectionEnd).toEqual(val.value.length)
  //     })
  //   })
})
