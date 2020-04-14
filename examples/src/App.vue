<template>
  <el-input
    :type="type"
    :autosize="autosize"
    v-model="textareaValue"
    clearable
    @change="handleChange"
  ></el-input>
  <el-button type="primary" @click="handleClick">change input type</el-button>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
import { InputType, AutoSize } from "src";

export default defineComponent({
  setup() {
    const state: {
      type: InputType;
      textareaValue: string;
      autosize: boolean | AutoSize;
    } = reactive({
      type: "textarea",
      textareaValue:
        "sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd",
      autosize: true
    });

    const handleChange = e => {
      console.log("handleChange", e);
    };

    const handleClick = () => {
      if (state.type === "text") {
        state.type = "textarea";
      } else {
        state.type = "text";
      }
    };

    return {
      ...toRefs(state),
      handleChange,
      handleClick
    };
  }
});
</script>
