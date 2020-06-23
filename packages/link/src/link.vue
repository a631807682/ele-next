<template>
  <a
    :class="[
      'el-link',
      type ? `el-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline',
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >
    <i :class="icon" v-if="icon"></i>

    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon"></slot>
    </template>
  </a>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LinkType } from './type'

export default defineComponent({
  name: 'ElLink',
  props: {
    type: {
      type: String as PropType<LinkType>,
      default: 'default',
    },
    underline: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    href: String,
    icon: String,
  },
  setup(props, ctx) {
    const handleClick = (event: Event) => {
      if (!props.disabled) {
        if (!props.href) {
          ctx.emit('click', event)
        }
      }
    }
    return {
      handleClick,
    }
  },
})
</script>
