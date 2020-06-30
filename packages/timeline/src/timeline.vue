<template>
  <ul class="el-timeline">
    <slot></slot>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElTimeline',
})
</script>
