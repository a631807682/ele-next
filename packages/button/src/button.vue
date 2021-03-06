<template>
  <button
    class="el-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, PropType } from 'vue'
import { ElementUIComponentSize } from 'src/component'
import { ButtonType, ButtonNativeType } from './type'
import { useForm } from 'src/utils/injection/form'

export default defineComponent({
  name: 'ElButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'default' as ButtonType,
    },
    size: String as PropType<ElementUIComponentSize>,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String as PropType<ButtonNativeType>,
      default: 'button' as ButtonNativeType,
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
  },
  setup(props) {
    const { disabled: buttonDisabled, size: buttonSize } = useForm(props)

    const state = reactive({
      buttonSize,
      buttonDisabled,
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
