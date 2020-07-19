import { createTest, mountWithElement, waitImmediate, wait } from '../util'
import { ref } from 'vue'
import { Tag } from 'packages/tag'

describe('Tag', () => {
  it('create', () => {
    const wrapper = mountWithElement({
      template: `
      <el-tag></el-tag>
      `,
    })
    expect(wrapper.classes('el-tag')).toBe(true)
    expect(wrapper.classes('el-tag__close')).toBe(false)
    expect(wrapper.classes('is-hit')).toBe(false)
    expect(wrapper.classes('md-fade-center')).toBe(false)
  })

  it('text', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-tag>标签</el-tag>
      `,
    })
    await waitImmediate()
    expect(wrapper.text()).toContain('标签')
  })

  it('type', () => {
    const wrapper = mountWithElement({
      template: `
      <el-tag type="primary"></el-tag>
      `,
    })
    expect(wrapper.classes('el-tag--primary')).toBe(true)
  })

  it('hit', () => {
    const wrapper = mountWithElement({
      template: `
      <el-tag hit></el-tag>
      `,
    })
    expect(wrapper.classes('is-hit')).toBe(true)
  })

  it('closable', async (done) => {
    const isClose = ref(false)
    const wrapper = mountWithElement({
      template: `
      <el-tag closable @close="handleClose">关闭标签</el-tag>
      `,
      setup() {
        const handleClose = () => {
          isClose.value = true
        }
        return { isClose, handleClose }
      },
    })
    const closeBtn = wrapper.find<HTMLElement>('.el-tag .el-tag__close').element
    closeBtn.click()
    await waitImmediate()
    expect(isClose.value).toBe(true)
    done()
  })

  it('closeTransition', () => {
    const wrapper = mountWithElement({
      template: `
      <el-tag closable closeTransition></el-tag>
      `,
    })
    expect(wrapper.classes('md-fade-center')).toBe(false)
  })

  it('color', () => {
    const wrapper = mountWithElement({
      template: `
      <el-tag ref="tag" color="rgb(0, 0, 0)"></el-tag>
      `,
    })
    const { style } = wrapper.findComponent({ ref: 'tag' }).element as any
    expect(style.backgroundColor).toBe('rgb(0, 0, 0)')
  })

  it('click', async (done) => {
    let clicksCount = ref(0)
    const wrapper = mountWithElement({
      template: `
      <el-tag ref="tag" @click="handleClick">点击标签</el-tag>
      `,
      setup() {
        const handleClick = () => {
          clicksCount.value = clicksCount.value + 1
        }
        return {
          clicksCount,
          handleClick,
        }
      },
    })

    const tag = wrapper.findComponent({ ref: 'tag' }).element as any
    tag.click()
    await wait(20)
    expect(clicksCount.value).toEqual(1)
    done()
  })

  it('theme', () => {
    const wrapper = createTest(Tag, { effect: 'dark' })
    expect(wrapper.className).toContain('el-tag--dark')
    expect(wrapper.className).not.toContain('el-tag--light')
    expect(wrapper.className).not.toContain('el-tag--plain')
  })
})
