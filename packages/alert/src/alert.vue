<template>
  <transition name="el-alert-fade">
    <div
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
      role="alert"
    >
      <i
        class="el-alert__icon"
        :class="[iconClass, isBigIcon]"
        v-if="showIcon"
      ></i>
      <div class="el-alert__content">
        <span
          class="el-alert__title"
          :class="[isBoldTitle]"
          v-if="title || $slots.title"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="el-alert__description" v-if="$slots.default && !description">
          <slot></slot>
        </p>
        <p class="el-alert__description" v-if="description && !$slots.default">
          {{ description }}
        </p>
        <i
          class="el-alert__closebtn"
          :class="{
            'is-customed': closeText !== '',
            'el-icon-close': closeText === '',
          }"
          v-show="closable"
          @click="close()"
          >{{ closeText }}</i
        >
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
const TYPE_CLASSES_MAP = {
  success: 'el-icon-success',
  warning: 'el-icon-warning',
  error: 'el-icon-error',
}
import { ref, computed, toRefs, defineComponent, PropType, reactive } from 'vue'
import { AlertType, AlertEffect } from './type'

export default defineComponent({
  name: 'ElAlert',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<AlertType>,
      default: 'info' as AlertType,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: '',
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String as PropType<AlertEffect>,
      default: 'light' as AlertEffect,
      validator: (value: string): boolean => {
        return ['light', 'dark'].indexOf(value) !== -1
      },
    },
  },
  setup(props, ctx) {
    // console.log('pps', props.type)

    const visible = ref(true)

    const state = reactive({
      type: props.type,
      description: props.description,
    })

    // methods
    const close = () => {
      visible.value = false
      ctx.emit('close')
    }

    const typeClass = computed(() => {
      return `el-alert--${state.type}`
    })
    const iconClass = computed(() => {
      return TYPE_CLASSES_MAP[state.type] || 'el-icon-info'
    })
    const isBigIcon = computed(() => {
      return state.description || ctx.slots.default ? 'is-big' : ''
    })
    const isBoldTitle = computed(() => {
      return state.description || ctx.slots.default ? 'is-bold' : ''
    })
    return {
      ...toRefs(state),
      visible,
      typeClass,
      iconClass,
      isBigIcon,
      isBoldTitle,
      close,
    }
  },
})
</script>
