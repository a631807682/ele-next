<template>
  <component :is="tag" :class="classList" :style="style">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, provide } from 'vue'
import { JustifyType, AlignType } from './type'

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
      type: String as PropType<JustifyType>,
      default: 'start' as JustifyType,
    },
    align: {
      type: String as PropType<AlignType>,
      default: 'top' as AlignType,
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

    return {
      style,
      classList: {
        'el-row': true,
        [`is-justify-${props.justify}`]: props.justify !== 'start',
        [`is-align-${props.align}`]: props.align !== 'top',
        'el-row--flex': props.type === 'flex',
      },
    }
  },
})
</script>
