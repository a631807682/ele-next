import { mountWithElement, wait } from '../util'

describe('Backtop', () => {
  it('create', async () => {
    const wrapper = mountWithElement({
      template: `
      <div ref="scrollTarget" class="test-scroll" 
        style="height: 100px; overflow: auto">
        <div style="height: 10000px; width: 100%">
          <el-backtop target=".test-scroll">
            <span>test_up_text</span>
          </el-backtop>
        </div>
      </div>
      `,
    })
    expect(wrapper.vm.$el).toBeTruthy()
    expect(wrapper.text()).toEqual('')
    const el = wrapper.vm.$refs.scrollTarget as any
    el.scrollTop = 2000
    await wait()
    expect(wrapper.find('.el-backtop').text()).toEqual('test_up_text')
  })
})
