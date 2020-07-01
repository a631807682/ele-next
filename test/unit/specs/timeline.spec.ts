import { mountWithElement, wait } from '../util'
import { ref } from 'vue'
// import { Timeline } from 'packages/timeline'

describe('Timeline', () => {
  it('create', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      `,
      setup() {
        const activities = [
          {
            content: '创建成功',
            timestamp: '2018-04-11',
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13',
          },
          {
            content: '活动按期开始',
            timestamp: '2018-04-15',
          },
        ]
        return {
          activities,
        }
      },
    })
    const vm = wrapper.vm as any
    const items = wrapper.findAll('.el-timeline-item__content')
    items.forEach((elm, index) => {
      expect(elm.text()).toEqual(vm.activities[index].content)
    })
    const timestampItems = wrapper.findAll('.el-timeline-item__timestamp')
    timestampItems.forEach((elm, index) => {
      expect(elm.text()).toEqual(vm.activities[index].timestamp)
    })
  })

  it('reverse', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      `,
      setup() {
        const reverse = ref(true)
        const activities = [
          {
            content: '创建成功',
            timestamp: '2018-04-11',
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13',
          },
          {
            content: '活动按期开始',
            timestamp: '2018-04-15',
          },
        ]
        return {
          activities,
          reverse,
        }
      },
    })
    const vm = wrapper.vm as any
    const items = wrapper.findAll('.el-timeline-item__content')
    items.forEach((elm, index) => {
      expect(elm.text()).toEqual(
        vm.activities[vm.activities.length - index - 1].content
      )
    })

    vm.reverse = false
    await wait()

    const itemsReverse = wrapper.findAll('.el-timeline-item__content')
    itemsReverse.forEach((elm, index) => {
      expect(elm.text()).toEqual(vm.activities[index].content)
    })
  })

  it('placement', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :placement="activity.placement">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      `,
      setup() {
        const activities = [
          {
            content: '创建成功',
            timestamp: '2018-04-11',
            placement: 'top',
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13',
          },
          {
            content: '活动按期开始',
            timestamp: '2018-04-15',
          },
        ]
        return {
          activities,
        }
      },
    })
    const item = wrapper.find('.el-timeline-item__timestamp')
    expect(item.classes('is-top')).toBeTruthy()
  })

  it('hide-timestamp', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :hide-timestamp="activity.hideTimestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      `,
      setup() {
        const activities = [
          {
            content: '创建成功',
            timestamp: '2018-04-11',
            hideTimestamp: true,
          },
          {
            content: '通过审核',
            timestamp: '2018-04-13',
          },
          {
            content: '活动按期开始',
            timestamp: '2018-04-15',
          },
        ]
        return {
          activities,
        }
      },
    })
    const items = wrapper.findAll('.el-timeline-item__timestamp')
    expect(items.length).toEqual(2)
  })

  it('color', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          timestamp="2018-04-11"
          color="#f00">
          创建成功
        </el-timeline-item>
      </el-timeline>
      `,
    })
    const item = wrapper.find<HTMLElement>('.el-timeline-item__node')
    expect(item.element.style.backgroundColor).toEqual('rgb(255, 0, 0)')
  })

  it('type', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          timestamp="2018-04-11"
          type="primary">
          创建成功
        </el-timeline-item>
      </el-timeline>
      `,
    })
    const item = wrapper.find<HTMLElement>('.el-timeline-item__node')
    expect(item.classes('el-timeline-item__node--primary')).toBeTruthy()
  })

  it('size', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          timestamp="2018-04-11"
          size="large">
          创建成功
        </el-timeline-item>
      </el-timeline>
      `,
    })
    const item = wrapper.find<HTMLElement>('.el-timeline-item__node')
    expect(item.classes('el-timeline-item__node--large')).toBeTruthy()
  })

  it('icon', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-timeline>
        <el-timeline-item
          timestamp="2018-04-11"
          icon="el-icon-more">
          创建成功
        </el-timeline-item>
      </el-timeline>
      `,
    })
    const item = wrapper.find<HTMLElement>('.el-timeline-item__icon')
    expect(item.classes('el-icon-more')).toBeTruthy()
  })
})
