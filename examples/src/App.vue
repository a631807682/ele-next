<template>
  <el-input
    :type="type"
    :autosize="autosize"
    v-model="textareaValue"
    clearable
    @change="handleChange"
    @input="handleInput"
    maxlength="10"
    show-word-limit
  ></el-input>
  <el-button type="primary" @click="handleClick">change input type</el-button>
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
      type: 'textarea',
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
