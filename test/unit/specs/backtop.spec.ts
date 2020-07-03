import { mountWithElement, wait } from '../util'

describe('Backtop', () => {
  it('create', async () => {
    const outerNode = document.createElement('div')
    outerNode.setAttribute('class', 'test-scroll')
    outerNode.setAttribute('style', 'height: 100px; overflow: auto')

    document.body.appendChild(outerNode)

    const wrapper = mountWithElement(
      {
        template: `
        <div style="height: 10000px; width: 100%">
          <el-backtop target=".test-scroll">
            <span>test_up_text</span>
          </el-backtop>
        </div>
      `,
      },
      {
        attachTo: outerNode,
      }
    )

    expect(wrapper.vm.$el).toBeTruthy()
    expect(wrapper.text()).toEqual('')
    outerNode.scrollTop = 2000
    outerNode.dispatchEvent(new Event('scroll'))

    await wait(300)
    expect(wrapper.text()).toEqual('test_up_text')
  })
})
