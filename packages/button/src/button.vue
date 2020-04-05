<!-- In v3 all v-on listeners will fallthrough to child component root by default
  see: https://github.com/vuejs/vue-next/issues/813 
  -->
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
import { inject, computed } from "vue";
import { ELEMENT_REF } from "src/component";

export default {
  name: "ElButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  setup(props) {
    const elForm = inject("elForm", {});
    const elFormItem = inject("elFormItem", {});

    const _elFormItemSize = computed(() => {
      return (elFormItem as any).elFormItemSize;
    });

    const buttonSize = computed(() => {
      return (
        props.size || _elFormItemSize.value || ELEMENT_REF.value.size
        // ||
        // (ELEMENT_REF1 && ELEMENT_REF1.size)
      );
    });

    const buttonDisabled = computed(() => {
      return props.disabled || (elForm as any).disabled;
    });

    return {
      elForm,
      elFormItem,
      _elFormItemSize,
      buttonSize,
      buttonDisabled
    };
  }
};
</script>
