/**
 * @jest-environment jsdom-sixteen
 */
import { mountWithProps, mountWithElement } from '../util'
// import { mountWithElement, waitImmediate } from '../util'
// import { ref } from 'vue'
import { Alert } from 'packages/alert'

describe('Alert', () => {
  it('create', async () => {
    const wrapper = mountWithProps(Alert, {
      title: 'create',
    })
    expect(wrapper.classes('el-alert')).toBe(true)
  })

  it('title', async () => {
    const title = 'test title'
    const wrapper = mountWithProps(Alert, {
      title,
    })
    expect(wrapper.props('title')).toEqual(title)
  })

  it('description', async () => {
    const description = 'test description'
    const wrapper = mountWithProps(Alert, {
      description,
    })
    expect(wrapper.props('description')).toEqual(description)
  })

  it('type', async () => {
    const type = 'warning'
    const wrapper = mountWithProps(Alert, {
      type,
    })
    expect(wrapper.props('type')).toEqual(type)
    expect(wrapper.classes('el-alert--warning')).toBe(true)
  })

  it('closable', async () => {
    const closable = false
    const wrapper = mountWithProps(Alert, {
      closable,
    })
    expect(wrapper.props('closable')).toEqual(closable)
    const closeBtn = wrapper.find<HTMLElement>('.el-alert__closebtn')
    expect(closeBtn.exists()).toBe(true)
  })

  it('closeText', async () => {
    const closeText = 'ok'
    const wrapper = mountWithProps(Alert, {
      closeText,
    })
    expect(wrapper.props('closeText')).toEqual(closeText)
    const closeBtn = wrapper.find<HTMLElement>('.is-customed')
    expect(closeBtn.exists()).toBe(true)
  })

  it('showIcon', async () => {
    const showIcon = true
    const wrapper = mountWithProps(Alert, {
      showIcon,
    })
    expect(wrapper.props('showIcon')).toEqual(showIcon)
    const iconBtn = wrapper.find<HTMLElement>('.el-alert__icon')
    expect(iconBtn.exists()).toBe(true)
  })

  it('center', async () => {
    const center = true
    const wrapper = mountWithProps(Alert, {
      center,
    })
    expect(wrapper.props('center')).toEqual(center)
    const centrClass = wrapper.find<HTMLElement>('.is-center')
    expect(centrClass.exists()).toBe(true)
  })

  it('effect', async () => {
    const effect = 'dark'
    const wrapper = mountWithProps(Alert, {
      effect,
    })
    expect(wrapper.props('effect')).toEqual(effect)
    const darkClass = wrapper.find<HTMLElement>('.is-dark')
    expect(darkClass.exists()).toBe(true)
  })

  it('close', async () => {
    const mockFn = jest.fn()

    const wrapper = mountWithElement({
      template: `
      <el-alert title="成功提示的文案" type="success" @close="mockFn"></el-alert>
      `,
      setup() {
        return {
          mockFn,
        }
      },
    })

    const closeBtn = wrapper.find('.el-alert__closebtn')
    await closeBtn.trigger('click')
    expect(mockFn).toBeCalledTimes(1)
  })
})
