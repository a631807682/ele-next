import { mountWithElement } from '../util'

describe('Divider', () => {
  let vm
  it('content', () => {
    vm = mountWithElement({
      template: `
          <el-divider>我是一条完美分割线！</el-divider>
      `,
    })
    expect(vm.text()).toContain('我是一条完美分割线！')
  })

  it('direction', () => {
    vm = mountWithElement({
      template: `
          <el-divider direction="vertical">我是一条完美分割线！</el-divider>
      `,
    })
    expect(vm.classes('el-divider--vertical')).toBe(true)
  })

  it('apply class to divider', () => {
    vm = mountWithElement({
      template: `
        <el-divider direction="vertical" class="my-divider">我是一条完美分割线！</el-divider>
      `,
    })
    expect(vm.classes('my-divider')).toBe(true)
  })
})
