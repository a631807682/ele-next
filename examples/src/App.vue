<template>
  <el-input
    :type="type"
    :autosize="autosize"
    v-model="textareaValue"
    clearable
    @change="handleChange"
    @input="handleInput"
    maxlength="200"
    show-word-limit
    prefix-icon="el-icon-search"
    suffix-icon="el-icon-date"
  ></el-input>
  <el-button type="primary" @click="handleClick">change input type</el-button>
  <el-tag>tag</el-tag>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import { InputType, AutoSize } from 'src'

export default defineComponent({
  setup() {
    const state: {
      type: InputType
      textareaValue: string
      autosize: boolean | AutoSize
    } = reactive({
      type: 'text',
      textareaValue: 'aa\nbb\ncc',
      autosize: true,
    })

    const handleChange = (e) => {
      console.log('handleChange', e)
    }

    const handleInput = (e) => {
      console.log('handleInput', e)
    }

    const handleClick = () => {
      if (state.type === 'text') {
        state.type = 'textarea'
      } else {
        state.type = 'text'
      }
    }

    return {
      ...toRefs(state),
      handleChange,
      handleClick,
      handleInput,
    }
  },
})
</script>
