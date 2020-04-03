<template>
  <div>
    <el-button type="primary" @click="inc">{{ count }}</el-button>
    <el-button type="warning" size="medium">large</el-button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const inc = (event: Event) => {
      count.value++;
    };

    return {
      count,
      inc
    };
  }
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
