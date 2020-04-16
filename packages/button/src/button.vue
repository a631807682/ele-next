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
import { computed, reactive, toRefs, defineComponent, PropType } from 'vue'
import { ElementUIOptions, ElementUIComponentSize } from 'src/component'
import { ButtonType, ButtonNativeType } from './type'
import { useForm } from 'src/utils/injection/form'

export default defineComponent({
  name: 'ElButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    size: String as PropType<ElementUIComponentSize>,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String as PropType<ButtonNativeType>,
      default: 'button',
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
  },
  setup(props) {
    const { elForm, elFormItem } = useForm()

    const state = reactive({
      buttonSize: computed(() => {
        return (
          props.size || elFormItem.elFormItemSize || ElementUIOptions.value.size
        )
      }),
      buttonDisabled: computed(() => {
        return props.disabled || elForm.disabled
      }),
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
