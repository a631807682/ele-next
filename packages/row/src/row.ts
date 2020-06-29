import { defineComponent, computed, provide, h } from 'vue'

export default defineComponent({
  name: 'ElRow',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'top',
    },
  },
  setup(props, { slots }) {
    const gutter = computed(() => props.gutter)

    const style = computed(() => {
      if (gutter.value) {
        const margin = `-${gutter.value / 2}px`
        return {
          marginLeft: margin,
          marginRight: margin,
        }
      }
      return {}
    })

    provide('gutter', gutter)

    return () => {
      return h(
        props.tag,
        {
          class: {
            'el-row': true,
            [`is-justify-${props.justify}`]: props.justify !== 'start',
            [`is-align-${props.align}`]: props.align !== 'top',
            'el-row--flex': props.type === 'flex',
          },
          style: style.value,
        },
        slots.default()
      )
    }
  },
})
