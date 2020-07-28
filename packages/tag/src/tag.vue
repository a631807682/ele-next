<template>
  <div :class="classes" :style="{ backgroundColor: color }">
    <slot></slot>
    <i
      v-if="closable"
      @click="handleClose"
      class="el-tag__close el-icon-close"
    ></i>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  getCurrentInstance,
  Ref,
} from 'vue'
import { TagEffect, TagSize, TagType } from './type'
import { ElementUIProp } from 'src/component'

export default defineComponent({
  name: 'ElTag',
  props: {
    closable: Boolean,
    type: {
      type: String as PropType<TagType>,
      validator: (val: string) => {
        return ['success', 'warning', 'danger', 'info'].includes(val)
      },
    },
    hit: Boolean,
    color: String,
    size: {
      type: String as PropType<TagSize>,
      validator: (val: string) => {
        return ['medium', 'small', 'mini'].includes(val)
      },
    },
    effect: {
      default: 'light',
      type: String as PropType<TagEffect>,
      validator: (val: string) => {
        return ['dark', 'light', 'plain'].includes(val)
      },
    },
  },
  setup(props, { emit, slots }) {
    // ctx: Private property
    const $ELEMENT = getCurrentInstance()['ctx']['$ELEMENT'] as Ref<
      ElementUIProp
    >

    const tagSize = computed(() => props.size || $ELEMENT.value.size)

    const classes = computed(() => [
      'el-tag',
      {
        [`el-tag--${props.type}`]: !!props.type,
        [`el-tag--${tagSize.value}`]: !!tagSize.value,
        [`el-tag--${props.effect}`]: !!props.effect,
        'is-hit': props.hit,
      },
    ])

    const handleClose = (event: Event): void => {
      event.stopPropagation()
      emit('close', event)
    }

    return {
      classes,
      handleClose,
    }
  },
})
</script>
