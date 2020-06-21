import { mountWithProps, mountWithElement } from '../util'
import { Card } from 'packages/card'

describe('Card', () => {
  it('slot:header', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-card>
        <template v-slot:header>
          <div>二师兄叫我埋梗 啦啦啦</div>
        </template>
      </el-card>
      `,
    })
    expect(wrapper.find<HTMLElement>('.el-card__header').text()).toEqual(
      '二师兄叫我埋梗 啦啦啦'
    )
  })

  it('header', async () => {
    const wrapper = mountWithProps(Card, {
      header: '好烦',
    })
    expect(wrapper.find<HTMLElement>('.el-card__header').text()).toEqual('好烦')
  })

  it('bodyStyle', async () => {
    const wrapper = mountWithProps(Card, {
      bodyStyle: { padding: '10px' },
    })
    expect(
      wrapper.find<HTMLElement>('.el-card__body').element.style.padding
    ).toEqual('10px')
  })

  it('shadow always', async () => {
    const wrapper = mountWithProps(Card, {
      shadow: 'always',
    })
    expect(wrapper.classes('is-always-shadow')).toBe(true)
  })

  it('shadow hover', async () => {
    const wrapper = mountWithProps(Card, {
      shadow: 'hover',
    })
    expect(wrapper.classes('is-hover-shadow')).toBe(true)
  })

  it('shadow never', async () => {
    const wrapper = mountWithProps(Card, {
      shadow: 'never',
    })
    expect(wrapper.classes('is-never-shadow')).toBe(true)
  })
})
