<template>
  <div
    class="el-progress"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      },
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="el-progress-bar" v-if="type === 'line'">
      <div
        class="el-progress-bar__outer"
        :style="{ height: strokeWidth + 'px' }"
      >
        <div class="el-progress-bar__inner" :style="barStyle">
          <div class="el-progress-bar__innerText" v-if="showText && textInside">
            {{ content }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="el-progress-circle"
      :style="{ height: width + 'px', width: width + 'px' }"
      v-else
    >
      <svg viewBox="0 0 100 100">
        <path
          class="el-progress-circle__track"
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="trailPathStyle"
        />
        <path
          class="el-progress-circle__path"
          :d="trackPath"
          :stroke="stroke"
          fill="none"
          :stroke-linecap="strokeLinecap"
          :stroke-width="percentage ? relativeStrokeWidth : 0"
          :style="circlePathStyle"
        />
      </svg>
    </div>
    <div
      class="el-progress__text"
      v-if="showText && !textInside"
      :style="{ fontSize: progressTextSize + 'px' }"
    >
      <template v-if="!status">{{ content }}</template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ProgressType, ProgressStatus, StrokeLinecap } from './type'
export default defineComponent({
  name: 'ElProgress',
  props: {
    type: {
      type: String as PropType<ProgressType>,
      default: 'line',
      validator: (val: string): boolean => {
        return ['line', 'circle', 'dashboard'].indexOf(val) !== -1
      },
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: (val: number): boolean => {
        return val >= 0 && val <= 100
      },
    },
    status: {
      type: String as PropType<ProgressStatus>,
      validator: (val: string): boolean => {
        return ['success', 'exception', 'warning'].indexOf(val) !== -1
      },
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    strokeLinecap: {
      type: String as PropType<StrokeLinecap>,
      default: 'round',
      validator: (val: string): boolean => {
        return ['butt', 'round', 'square'].indexOf(val) !== -1
      },
    },
    textInside: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 126,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    color: {
      type: [String, Array, Function],
      default: '',
    },
    format: Function,
  },
  setup(props) {
    const barStyle = computed(() => {
      const style: any = {}
      style.width = props.percentage + '%'
      style.backgroundColor = getCurrentColor(props.percentage)
      return style
    })

    const relativeStrokeWidth = computed<string>(() => {
      return ((props.strokeWidth / props.width) * 100).toFixed(1)
    })

    const radius = computed<number>(() => {
      if (props.type === 'circle' || props.type === 'dashboard') {
        return 50 - parseFloat(relativeStrokeWidth.value) / 2
      } else {
        return 0
      }
    })
    const trackPath = computed<string>(() => {
      const rad = radius.value
      const isDashboard = props.type === 'dashboard'
      return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${rad}
          a ${rad} ${rad} 0 1 1 0 ${isDashboard ? '-' : ''}${rad * 2}
          a ${rad} ${rad} 0 1 1 0 ${isDashboard ? '' : '-'}${rad * 2}
          `
    })
    const perimeter = computed(() => {
      return 2 * Math.PI * radius.value
    })
    const rate = computed(() => {
      return props.type === 'dashboard' ? 0.75 : 1
    })
    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.value * (1 - rate.value)) / 2
      return `${offset}px`
    })
    const trailPathStyle = computed(() => {
      return {
        strokeDasharray: `${perimeter.value * rate.value}px, ${
          perimeter.value
        }px`,
        strokeDashoffset: strokeDashoffset.value,
      }
    })
    const circlePathStyle = computed(() => {
      return {
        strokeDasharray: `${
          perimeter.value * rate.value * (props.percentage / 100)
        }px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
      }
    })

    const stroke = computed(() => {
      let ret
      if (props.color) {
        ret = getCurrentColor(props.percentage)
      } else {
        switch (props.status) {
          case 'success':
            ret = '#13ce66'
            break
          case 'exception':
            ret = '#ff4949'
            break
          case 'warning':
            ret = '#e6a23c'
            break
          default:
            ret = '#20a0ff'
        }
      }
      return ret
    })
    const iconClass = computed(() => {
      if (props.status === 'warning') {
        return 'el-icon-warning'
      }
      if (props.type === 'line') {
        return props.status === 'success'
          ? 'el-icon-circle-check'
          : 'el-icon-circle-close'
      } else {
        return props.status === 'success' ? 'el-icon-check' : 'el-icon-close'
      }
    })
    const progressTextSize = computed(() => {
      return props.type === 'line'
        ? 12 + props.strokeWidth * 0.4
        : props.width * 0.111111 + 2
    })
    const content = computed(() => {
      if (typeof props.format === 'function') {
        return props.format(props.percentage) || ''
      } else {
        return `${props.percentage}%`
      }
    })

    const getCurrentColor = (percentage: number) => {
      if (typeof props.color === 'function') {
        return props.color(percentage)
      } else if (typeof props.color === 'string') {
        return props.color
      } else {
        return getLevelColor(percentage)
      }
    }

    const getLevelColor = (percentage: number): string => {
      const colorArray = getColorArray().sort(
        (a, b) => a.percentage - b.percentage
      )

      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color
        }
      }
      return colorArray[colorArray.length - 1].color
    }

    const getColorArray = () => {
      const color: any[] = props.color as Array<any>
      const span = 100 / color.length
      return color.map((seriesColor, index) => {
        if (typeof seriesColor === 'string') {
          return {
            color: seriesColor,
            progress: (index + 1) * span,
          }
        }
        return seriesColor
      })
    }

    return {
      barStyle,
      relativeStrokeWidth,
      trackPath,
      trailPathStyle,
      circlePathStyle,
      stroke,
      iconClass,
      progressTextSize,
      content,
    }
  },
})
</script>
