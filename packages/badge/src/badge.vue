<template>
  <div class="el-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        :class="[
          'el-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot,
          },
        ]"
      ></sup>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'ElBadge',
  props: {
    value: [String, Number],
    max: Number,
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      validator: (val: string): boolean => {
        return (
          ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) !==
          -1
        )
      },
    },
  },
  setup(props) {
    const content = computed(() => {
      if (props.isDot) return
      const value = props.value
      const max = props.max
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value
      }
      return value
    })
    return {
      content,
    }
  },
})
</script>
