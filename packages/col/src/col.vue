<template>
  <component :is="tag" :class="['el-col', classList]" :style="style">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'

const typeList = ['span', 'offset', 'pull', 'push']
const sizeList = ['xs', 'sm', 'md', 'lg', 'xl']

export default defineComponent({
  name: 'ElCol',
  props: {
    span: {
      type: Number,
      default: 24,
    },
    tag: {
      type: String,
      default: 'div',
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
  },
  setup(props, { slots }) {
    const injectGutter = inject('gutter', 0)

    const gutter = computed(() => {
      return injectGutter['value'] || 0
    })

    const style = computed(() => {
      if (gutter.value) {
        const padding = `${gutter.value / 2}px`
        return {
          paddingLeft: padding,
          paddingRight: padding,
        }
      }
      return {}
    })

    const classList = computed(() => {
      const className = []
      typeList.forEach((prop) => {
        if (props[prop] || props[prop] === 0) {
          className.push(
            prop !== 'span'
              ? `el-col-${prop}-${props[prop]}`
              : `el-col-${props[prop]}`
          )
        }
      })

      sizeList.forEach((size) => {
        if (typeof props[size] === 'number') {
          className.push(`el-col-${size}-${props[size]}`)
        } else if (typeof props[size] === 'object') {
          const propObj = props[size]
          Object.keys(propObj).forEach((prop) => {
            console.log(
              prop !== 'span'
                ? `el-col-${size}-${prop}-${propObj[prop]}`
                : `el-col-${size}-${propObj[prop]}`
            )
            className.push(
              prop !== 'span'
                ? `el-col-${size}-${prop}-${propObj[prop]}`
                : `el-col-${size}-${propObj[prop]}`
            )
          })
        }
      })

      return className
    })

    return {
      classList,
      style,
    }
  },
})
</script>
