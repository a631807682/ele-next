<template>
  <!-- <button @click="inc">{{count}}</button> -->
  <el-button type="primary" @click="inc">{{count}}</el-button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const inc = event => {
      console.log("click", event, count.value); // emit once in vue2.x but twice in vue3?
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
