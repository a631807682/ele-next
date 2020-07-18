import { mountWithProps, mountWithElement } from '../util'
import { Tag } from 'packages/tag'
import { ref } from 'vue'

describe('Tag', () => {
  it('create', () => {
    const wrapper = mountWithProps(Tag)
    expect(wrapper.classes('el-tag')).toBe(true)
    expect(wrapper.classes('el-tag__close')).toBe(false)
    expect(wrapper.classes('is-hit')).toBe(false)
    expect(wrapper.classes('md-fade-center')).toBe(false)
  })

  it('text', () => {
    const text = '标签'
    const wrapper = mountWithElement({
      template: `<el-tag>${text}</el-tag>`,
    })
    expect(wrapper.vm.$el.textContent).toEqual(text)
  })

  it('type', () => {
    const wrapper = mountWithProps(Tag, {
      type: 'primary',
    })
    expect(wrapper.classes('el-tag--primary')).toBe(true)
  })

  it('hit', () => {
    const wrapper = mountWithProps(Tag, {
      hit: true,
    })
    expect(wrapper.classes('is-hit')).toBe(true)
  })

  it('closable', async () => {
    const wrapper = mountWithElement({
      template: `<el-tag @close="handleClose" closable>关闭标签</el-tag>`,
      setup() {
        const isClose = ref(false)
        function handleClose() {
          isClose.value = true
        }
        return {
          isClose,
          handleClose,
        }
      },
    })
    const vm = wrapper.vm as any
    const closeBtn = wrapper.find<HTMLElement>('.el-tag .el-tag__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(vm.isClose).toBe(true)
  })

  it('closeTransition', () => {
    const wrapper = mountWithProps(Tag, {
      closable: true,
      closeTransition: true,
    })

    expect(wrapper.classes('md-fade-center')).toBe(false)
  })

  it('color', () => {
    const wrapper = mountWithProps(Tag, {
      color: 'rgb(0, 0, 0)',
    })
    expect(wrapper.vm.$el.style.backgroundColor).toEqual('rgb(0, 0, 0)')
  })

  it('click', async () => {
    const wrapper = mountWithElement({
      template: `<el-tag ref="tag" @click="handleClick">关闭标签</el-tag>`,
      setup() {
        const clicksCount = ref(0)
        function handleClick() {
          clicksCount.value += 1
        }
        return {
          clicksCount,
          handleClick,
        }
      },
    })

    wrapper.vm.$el.click()
    expect(wrapper.vm['clicksCount']).toEqual(1)
  })

  it('theme', () => {
    const wrapper = mountWithProps(Tag, {
      effect: 'dark',
    })

    expect(wrapper.classes('el-tag--dark')).toBe(true)
    expect(wrapper.classes('el-tag--light')).toBe(false)
    expect(wrapper.classes('el-tag--plain')).toBe(false)
  })
})
