<template>
  <li class="el-timeline-item">
    <div class="el-timeline-item__tail"></div>
    <div
      v-if="!$slots.dot"
      class="el-timeline-item__node"
      :class="[
        `el-timeline-item__node--${size || ''}`,
        `el-timeline-item__node--${type || ''}`,
      ]"
      :style="{
        backgroundColor: color,
      }"
    >
      <i v-if="icon" class="el-timeline-item__icon" :class="icon"></i>
    </div>
    <div v-if="$slots.dot" class="el-timeline-item__dot">
      <slot name="dot"></slot>
    </div>
    <div class="el-timeline-item__wrapper">
      <div
        v-if="!hideTimestamp && placement === 'top'"
        class="el-timeline-item__timestamp is-top"
      >
        {{ timestamp }}
      </div>

      <div class="el-timeline-item__content">
        <slot></slot>
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        class="el-timeline-item__timestamp is-bottom"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  TimelinePlacement,
  TimelineType,
  TimelineColor,
  TimelineSize,
} from './type'

export default defineComponent({
  name: 'ElTimelineItem',
  props: {
    timestamp: String,
    hideTimestamp: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String as PropType<TimelinePlacement>,
      default: 'bottom',
    },
    type: String as PropType<TimelineType>,
    color: String as PropType<TimelineColor>,
    size: {
      type: String as PropType<TimelineSize>,
      default: 'normal',
    },
    icon: String,
  },
})
</script>
