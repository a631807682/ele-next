import { mountWithProps } from '../util'
import { Row } from 'packages/row'

describe('Row', () => {

  it('create', () => {
    const wrapper = mountWithProps(Row)
    expect(wrapper.classes('el-row')).toBe(true)
  })

  it('gutter', () => {
    const wrapper = mountWithProps(Row, {
      gutter: 20
    })
    const style = wrapper.vm.style
    expect(style.marginLeft).toBe('-10px')
    expect(style.marginRight).toBe('-10px')
  })

  it('type', () => {
    const wrapper = mountWithProps(Row, {
      type: 'flex'
    })
    expect(wrapper.classes('el-row--flex')).toBe(true)
  })

  it('justify', () => {
    const wrapper = mountWithProps(Row, {
      justify: 'end'
    });
    expect(wrapper.classes('is-justify-end')).toBe(true)
  });

  it('align', () => {
    const wrapper = mountWithProps(Row, {
      align: 'bottom'
    })
    expect(wrapper.classes('is-align-bottom')).toBe(true)
  });

})
