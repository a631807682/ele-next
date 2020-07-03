import { mountWithProps, mountWithElement } from '../util'
import { Col } from 'packages/col'

describe('Col', () => {

  it('create', () => {
    const wrapper = mountWithProps(Col, {
      span: 12
    })
    expect(wrapper.classes('el-col')).toBe(true)
  })

  it('span', () => {
    const wrapper = mountWithProps(Col, {
      span: 12
    })
    expect(wrapper.classes('el-col-12')).toBe(true)
  })

  it('pull', () => {
    const wrapper = mountWithProps(Col, {
      span: 12,
      pull: 3
    })
    expect(wrapper.classes('el-col-pull-3')).toBe(true)
  })

  it('push', () => {
    const wrapper = mountWithProps(Col, {
      span: 12,
      push: 3
    })
    expect(wrapper.classes('el-col-push-3')).toBe(true)
  })

  it('gutter', () => {
    const wrapper = mountWithElement({
      template: `
        <el-row :gutter="20">
          <el-col :span="12" ref="col"></el-col>
        </el-row>
       `
    })
    const { style } = wrapper.findComponent({ ref: 'col' }).vm as any

    expect(style.paddingLeft).toBe('10px')
    expect(style.paddingRight).toBe('10px')
  })

  it('responsive', () => {
    const wrapper = mountWithElement({
      template: `
        <el-row :gutter="20">
          <el-col ref="col" :sm="{ span: 4, offset: 2 }" :md="8" :lg="{ span: 6, offset: 3 }">
          </el-col>
        </el-row>
      `
    })
    const colElm = wrapper.findComponent({ ref: 'col' }) as any

    expect(colElm.classes('el-col-sm-4')).toBe(true)
    expect(colElm.classes('el-col-sm-offset-2')).toBe(true)
    expect(colElm.classes('el-col-lg-6')).toBe(true)
    expect(colElm.classes('el-col-lg-offset-3')).toBe(true)
    expect(colElm.classes('el-col-md-8')).toBe(true)
  })

})
