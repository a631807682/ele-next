import { mountWithElement, waitImmediate } from '../util'
import { ref, reactive, toRefs } from 'vue'

describe('Progress', () => {
  it('create', async () => {
    const wrapper = mountWithElement({
      template: `
      <div>
        <el-progress name="percent0" :percentage="0"></el-progress>
        <el-progress name="percent50" :percentage="50"></el-progress>
        <el-progress name="percent100" :percentage="100"></el-progress>
      </div>
      `,
    })
    const comp0 = wrapper.find('[name="percent0"]')
    expect(comp0.find('.el-progress__text').text()).toEqual('0%')
    expect(comp0.find('.el-progress-bar__inner').attributes('style')).toEqual(
      'width: 0%;'
    )

    const comp50 = wrapper.find('[name="percent50"]')
    expect(comp50.find('.el-progress__text').text()).toEqual('50%')
    expect(comp50.find('.el-progress-bar__inner').attributes('style')).toEqual(
      'width: 50%;'
    )

    const comp100 = wrapper.find('[name="percent100"]')
    expect(comp100.find('.el-progress__text').text()).toEqual('100%')
    expect(comp100.find('.el-progress-bar__inner').attributes('style')).toEqual(
      'width: 100%;'
    )
  })

  it('status', async () => {
    const wrapper = mountWithElement({
      template: `
      <div>
          <el-progress name="lineSuccess" :percentage="100" status="success"></el-progress>
          <el-progress name="lineException" :percentage="0" status="exception"></el-progress>
          <el-progress type="circle" name="circleSuccess" :percentage="100" status="success"></el-progress>
          <el-progress type="circle" name="circleException" :percentage="0" status="exception"></el-progress>
        </div>
      `,
    })
    const lineSuccess = wrapper.find('[name="lineSuccess"]')
    expect(lineSuccess.classes('is-success')).toBeTruthy()
    expect(
      lineSuccess.find('.el-progress__text .el-icon-circle-check').exists()
    ).toBeTruthy()

    const lineException = wrapper.find('[name="lineException"]')
    expect(lineException.classes('is-exception')).toBeTruthy()
    expect(
      lineException.find('.el-progress__text .el-icon-circle-close').exists()
    ).toBeTruthy()

    const circleSuccess = wrapper.find('[name="circleSuccess"]')
    expect(circleSuccess.classes('is-success')).toBeTruthy()
    expect(
      circleSuccess.find('.el-progress__text .el-icon-check').exists()
    ).toBeTruthy()

    const circleException = wrapper.find('[name="circleException"]')
    expect(circleException.classes('is-exception')).toBeTruthy()
    expect(
      circleException.find('.el-progress__text .el-icon-close').exists()
    ).toBeTruthy()
  })

  it('text inside', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="50" text-inside></el-progress>
      `,
    })
    expect(wrapper.classes('el-progress--text-inside')).toBeTruthy()
  })

  it('stroke width', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="50" :stroke-width="8"></el-progress>
      `,
    })
    expect(
      wrapper
        .find('.el-progress-bar__outer')
        .attributes('style')
        .includes('height: 8px')
    ).toBeTruthy()
  })

  it('show text', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="50" :show-text="false"></el-progress>
      `,
    })
    expect(wrapper.find('.el-progress__text').exists()).toBeFalsy()
  })

  it('circle', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress type="circle" :percentage="50"></el-progress>
      `,
    })
    expect(wrapper.classes('el-progress--circle')).toBeTruthy()
  })

  it('dashboard', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress type="dashboard" :percentage="50"></el-progress>
      `,
    })
    expect(wrapper.classes('el-progress--dashboard')).toBeTruthy()
  })

  it('width', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress type="circle" :percentage="50" :width="120"></el-progress>
      `,
    })
    expect(
      wrapper
        .find('.el-progress-circle')
        .attributes('style')
        .includes('height: 120px')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.el-progress-circle')
        .attributes('style')
        .includes('width: 120px')
    ).toBeTruthy()
  })

  it('show work with stroke-width', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :text-inside="true" :stroke-width="36" :percentage="0"></el-progress>
      `,
    })
    expect(
      wrapper
        .find('.el-progress-bar__outer')
        .attributes('style')
        .includes('height: 36px')
    ).toBeTruthy()
  })

  it('color', () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="50" color="rgb(0, 0, 0)"></el-progress>
      `,
    })
    expect(
      wrapper
        .find('.el-progress-bar__inner')
        .attributes('style')
        .includes('background-color: rgb(0, 0, 0)')
    ).toBeTruthy()
  })

  it('color is function', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="percentage" :color="customColor"></el-progress>
      `,
      setup() {
        const percentage = ref(50)

        const customColor = (percentage: number): string => {
          if (percentage > 50) {
            return '#13ce66'
          } else {
            return '#20a0ff'
          }
        }
        const increase = () => {
          percentage.value = 60
        }

        return {
          customColor,
          increase,
          percentage,
        }
      },
    })
    expect(
      wrapper
        .find('.el-progress-bar__inner')
        .attributes('style')
        .includes('background-color: rgb(32, 160, 255)')
    ).toBeTruthy()
    const vm = wrapper.vm as any
    vm.increase()
    await waitImmediate()
    expect(
      wrapper
        .find('.el-progress-bar__inner')
        .attributes('style')
        .includes('background-color: rgb(19, 206, 102)')
    ).toBeTruthy()
  })

  it('color is array', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="percentage" :color="colors"></el-progress>
      `,
      setup() {
        const state = reactive({
          percentage: 50,
          colors: [
            { color: '#f56c6c', percentage: 20 },
            { color: '#e6a23c', percentage: 40 },
            { color: '#20a0ff', percentage: 60 },
            { color: '#13ce66', percentage: 80 },
            { color: '#6f7ad3', percentage: 100 },
          ],
        })

        const increase = () => {
          state.percentage = 70
        }

        return {
          ...toRefs(state),
          increase,
        }
      },
    })
    expect(
      wrapper
        .find('.el-progress-bar__inner')
        .attributes('style')
        .includes('background-color: rgb(32, 160, 255)')
    ).toBeTruthy()
    const vm = wrapper.vm as any
    vm.increase()
    await waitImmediate()
    expect(
      wrapper
        .find('.el-progress-bar__inner')
        .attributes('style')
        .includes('background-color: rgb(19, 206, 102)')
    ).toBeTruthy()
  })

  it('format content', async () => {
    const wrapper = mountWithElement({
      template: `
      <el-progress :percentage="50" :format="format"></el-progress>
      `,
      setup() {
        const format = (percentage: number): string => {
          return `占比${percentage}%`
        }
        return {
          format,
        }
      },
    })
    expect(wrapper.find('.el-progress__text').text()).toEqual('占比50%')
  })
})
