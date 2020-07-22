import { mountWithElement, wait } from '../util'

describe('Breadcrumb', () => {
  it('create', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      `,
    })
    await wait()
    expect(
      wrapper.find<HTMLElement>('.el-breadcrumb__separator').text()
    ).toEqual('>')
  })

  it('seperator-class', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-breadcrumb separator-class="el-icon-check">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      `,
    })
    await wait()
    expect(
      wrapper.find<HTMLElement>('.el-breadcrumb__separator.el-icon-check')
    ).toBeTruthy()
  })
})
