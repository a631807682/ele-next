<template>
  <div :class="['el-divider', `el-divider--${direction}`]">
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="['el-divider__text', `is-${contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { dividerDirection, dividerContentPosition } from './type'
export default {
  name: 'ElDivider',
  props: {
    direction: {
      type: String as PropType<dividerDirection>,
      default: 'horizontal' as dividerDirection,
      validator: (val: string): boolean => {
        return ['horizontal', 'vertical'].indexOf(val) !== -1
      },
    },
    contentPosition: {
      type: String as PropType<dividerContentPosition>,
      default: 'center' as dividerContentPosition,
      validator: (val: string): boolean => {
        return ['left', 'center', 'right'].indexOf(val) !== -1
      },
    },
  },
}
</script>
