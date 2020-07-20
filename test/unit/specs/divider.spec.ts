import { mountWithElement } from '../util'

describe('Divider', () => {
  it('content', () => {
    const wrapper = mountWithElement({
      template: `
          <el-divider>我是一条完美分割线！</el-divider>
      `,
    })
    expect(wrapper.text()).toContain('我是一条完美分割线！')
  })

  it('direction', () => {
    const wrapper = mountWithElement({
      template: `
          <el-divider direction="vertical">我是一条完美分割线！</el-divider>
      `,
    })
    expect(wrapper.classes('el-divider--vertical')).toBe(true)
  })

  it('apply class to divider', () => {
    const wrapper = mountWithElement({
      template: `
        <el-divider direction="vertical" class="my-divider">我是一条完美分割线！</el-divider>
      `,
    })
    expect(wrapper.classes('my-divider')).toBe(true)
  })
})
