<template>
  <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue'
import { propsSymbol } from './propsKey'
export default defineComponent({
  name: 'ElBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
    },
    separatorClass: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    provide(propsSymbol, props)
  },
})
</script>
