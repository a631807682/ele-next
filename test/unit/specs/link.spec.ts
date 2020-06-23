import { mountWithProps, mountWithElement } from '../util'
import { Link } from 'packages/link'

describe('Link', () => {
  it('create', async () => {
    const wrapper = mountWithProps(Link, {
      type: 'primary',
    })
    expect(wrapper.classes('el-link--primary')).toBeTruthy()
  })

  it('icon', async () => {
    const wrapper = mountWithProps(Link, {
      icon: 'el-icon-search',
    })
    expect(wrapper.find('.el-icon-search').exists()).toBeTruthy()
  })

  it('href', async () => {
    const wrapper = mountWithProps(Link, {
      href: 'https://element.eleme.io/',
    })
    expect(wrapper.attributes('href')).toEqual('https://element.eleme.io/')
  })

  it('target', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-link href="https://element.eleme.io" target="_blank">
       default
      </el-link>
      `,
    })
    expect(wrapper.attributes('target')).toBe('_blank')
  })

  it('disabled', async () => {
    const wrapper = mountWithProps(Link, {
      disabled: true,
    })
    expect(wrapper.classes('is-disabled')).toBeTruthy()
  })

  it('click', async () => {
    const mockFn = jest.fn()

    const wrapper = mountWithElement({
      template: `
      <el-link @click="mockFn"></el-link>
      `,
      setup() {
        return {
          mockFn,
        }
      },
    })
    await wrapper.trigger('click')
    expect(mockFn).toBeCalledTimes(3)
  })
})
