import { mountWithProps, mountWithElement } from '../util'
import { Badge } from 'packages/badge'

describe('Badge', () => {
  it('value', async () => {
    const wrapper = mountWithProps(Badge, {
      value: 12,
    })
    const vm = wrapper.vm as any
    expect(vm.content).toBe(12)
  })

  it('is fixed', () => {
    const wrapper = mountWithElement({
      template: `
      <el-badge>
        <button>click</button>
      </el-badge>
      `,
    })
    expect(
      wrapper.find<HTMLElement>('.el-badge__content.is-fixed').exists()
    ).toBeTruthy()
  })

  it('is dot', () => {
    const wrapper = mountWithElement({
      template: `
      <el-badge is-dot>
        <button>click</button>
      </el-badge>
      `,
    })
    expect(
      wrapper.find<HTMLElement>('.el-badge__content.is-dot').exists()
    ).toBeTruthy()
  })

  it('larger than max', () => {
    const wrapper = mountWithProps(Badge, {
      value: 102,
      max: 99,
    })
    const vm = wrapper.vm as any
    expect(vm.content).toBe('99+')
  })

  it('smaller than max', () => {
    const wrapper = mountWithProps(Badge, {
      value: 80,
      max: 99,
    })
    const vm = wrapper.vm as any
    expect(vm.content).toBe(80)
  })
})
