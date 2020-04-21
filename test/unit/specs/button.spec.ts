import { mountWithProps, mountWithElement } from '../util'
import { Button } from 'packages/button'

describe('Button', () => {
  it('create', () => {
    const wrapper = mountWithProps(Button, {
      type: 'primary',
    })
    expect(wrapper.classes('el-button--primary')).toBe(true)
  })

  it('icon', () => {
    const wrapper = mountWithProps(Button, {
      icon: 'el-icon-search',
    })
    expect(wrapper.find('.el-icon-search').exists()).toBe(true)
  })

  it('nativeType', () => {
    const wrapper = mountWithProps(Button, {
      nativeType: 'submit',
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('loading', () => {
    const wrapper = mountWithProps(Button, {
      loading: true,
    })
    expect(wrapper.classes('is-loading')).toBe(true)
    expect(wrapper.find('.el-icon-loading').exists()).toBe(true)
  })

  it('disabled', () => {
    const wrapper = mountWithProps(Button, {
      disabled: true,
    })
    expect(wrapper.classes('is-disabled')).toBe(true)
  })

  it('size', () => {
    const wrapper = mountWithProps(Button, {
      size: 'medium',
    })

    expect(wrapper.classes('el-button--medium')).toBe(true)
  })

  it('plain', () => {
    const wrapper = mountWithProps(Button, {
      plain: true,
    })

    expect(wrapper.classes('is-plain')).toBe(true)
  })

  it('round', () => {
    const wrapper = mountWithProps(Button, {
      round: true,
    })

    expect(wrapper.classes('is-round')).toBe(true)
  })

  it('circle', () => {
    const wrapper = mountWithProps(Button, {
      circle: true,
    })

    expect(wrapper.classes('is-circle')).toBe(true)
  })

  it('click', async () => {
    let result
    const Component = {
      template: `
        <el-button @click="handleClick"></el-button>
      `,
      setup() {
        return {
          handleClick(evt) {
            result = evt
          },
        }
      },
    }
    const wrapper = mountWithElement(Component)

    // TODO: wait for vtu findComponent to simplfy test
    await wrapper.trigger('click')
    expect(result).toBeDefined()
  })

  it('click inside', async () => {
    let result
    const wrapper = mountWithElement({
      template: `
          <el-button @click="handleClick"><span class="inner-slot"></span></el-button>
        `,
      setup() {
        function handleClick(evt) {
          result = evt
        }
        return {
          handleClick,
        }
      },
    })
    const insideElement = wrapper.find<HTMLElement>('.inner-slot').element
    await insideElement.click()
    expect(result).toBeDefined()
  })

  it('loading implies disabled', async () => {
    let result
    const wrapper = mountWithElement({
      template: `
        <el-button loading @click="handleClick"></el-button>
        `,
      setup() {
        function handleClick(evt) {
          result = evt
        }
        return {
          handleClick,
        }
      },
    })
    await (wrapper.element as HTMLElement).click()
    expect(result).toBeUndefined()
  })
})
