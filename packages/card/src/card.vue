<template>
  <div
    class="el-card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'"
  >
    <div class="el-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ShadowTrigger } from './type'

export default defineComponent({
  name: 'ElCard',
  props: {
    header: String,
    bodyStyle: {},
    shadow: {
      type: String as PropType<ShadowTrigger>,
      validator: (value: string): boolean => {
        return ['always', 'hover', 'never'].indexOf(value) !== -1
      },
    },
  },
})
</script>
