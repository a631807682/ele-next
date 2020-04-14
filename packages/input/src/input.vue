<template>
  <div
    :class="[
      type === 'textarea' ? 'el-textarea' : 'el-input',
      inputSize ? 'el-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'el-input-group': $slots.prepend || $slots.append,
        'el-input-group--append': $slots.append,
        'el-input-group--prepend': $slots.prepend,
        'el-input--prefix': $slots.prefix || prefixIcon,
        'el-input--suffix':
          $slots.suffix || suffixIcon || clearable || showPassword,
      },
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @inputSelect="select"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        ref="refInput"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      />
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
      <!-- 后置内容 -->
      <span class="el-input__suffix" v-if="getSuffixVisible()">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="el-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="el-input__icon el-icon-view el-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="el-input__count">
            <span class="el-input__count-inner">{{ textLength }}/{{ upperLimit }}</span>
          </span>
        </span>
        <i
          class="el-input__icon"
          v-if="validateState"
          :class="['el-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="el-textarea__inner"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      ref="refTextarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    ></textarea>
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="el-input__count"
    >{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script lang="ts">
import {
  ref,
  computed,
  nextTick,
  reactive,
  toRefs,
  onUpdated,
  defineComponent,
  PropType,
  Ref,
  watch,
  onMounted
} from "vue";
import { useForm } from "src/utils/injection/form";
import { isNumber, isKorean } from "src/utils/share";
import calcTextareaHeight from "./calcTextareaHeight";
import { ElementUIOptions, ElementUIComponentSize } from "src/component";
import { Resizability, InputType, AutoSize } from "./type";

export default defineComponent({
  name: "ElInput",

  // TODO: dispatch to form
  // mixins: [emitter, Migrating],

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number]
    },
    size: String as PropType<ElementUIComponentSize>,
    resize: String as PropType<Resizability>,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String as PropType<InputType>,
      default: "text"
    },
    autosize: {
      type: [Boolean, Object] as PropType<boolean | AutoSize>,
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  setup(props, ctx) {
    const { elForm, elFormItem } = useForm();
    const textareaCalcStyle = ref({});
    const focused: Ref<boolean> = ref(false);
    const isComposing: Ref<boolean> = ref(false);
    // ref template
    const refInput: Ref<HTMLInputElement> = ref(null);
    const refTextarea: Ref<HTMLTextAreaElement> = ref(null);

    const nativeInputValue = computed(() => {
      return props.modelValue === null || props.modelValue === undefined
        ? ""
        : String(props.modelValue as number);
    });

    const nativeInputType = computed(() => props.type);

    const state = reactive({
      hovering: false,
      passwordVisible: false,
      autocomplete: props.autocomplete,
      modelValue: props.modelValue,
      suffixIcon: props.suffixIcon,
      showPassword: props.showPassword,
      validateEvent: props.validateEvent,
      autosize: props.autosize,
      type: nativeInputType,
      needStatusIcon: computed(() => {
        return elForm.statusIcon || false;
      }),
      validateState: computed(() => {
        return elFormItem ? elFormItem.validateState : "";
      }),
      inputSize: computed(() => {
        return (
          props.size || elFormItem.elFormItemSize || ElementUIOptions.value.size
        );
      }),
      inputDisabled: computed(() => {
        return props.disabled || elForm.disabled;
      }),
      validateIcon: computed(() => {
        return {
          validating: "el-icon-loading",
          success: "el-icon-circle-check",
          error: "el-icon-circle-close"
        }[state.validateState];
      }),
      textareaStyle: computed(() => {
        return { ...textareaCalcStyle.value, ...{ resize: props.resize } };
      }),
      showClear: computed(() => {
        return (
          props.clearable &&
          !state.inputDisabled &&
          !props.readonly &&
          !!nativeInputValue.value &&
          (focused.value || state.hovering)
        );
      }),
      showPwdVisible: computed(() => {
        return (
          props.showPassword &&
          !state.inputDisabled &&
          !props.readonly &&
          (!!nativeInputValue.value || focused.value)
        );
      }),
      isWordLimitVisible: computed(() => {
        return (
          props.showWordLimit &&
          ctx.attrs.maxlength &&
          (props.type === "text" || props.type === "textare") &&
          !state.inputDisabled &&
          !props.readonly &&
          !props.showPassword
        );
      }),
      upperLimit: computed(() => ctx.attrs.maxlength),
      textLength: computed(() => {
        if (isNumber(props.modelValue)) {
          return String(props.modelValue).length;
        }
        return ((props.modelValue as string) || "").length;
      }),
      inputExceed: computed(() => {
        return state.isWordLimitVisible && state.textLength > state.upperLimit;
      })
    });

    // methods
    const handleCompositionStart = () => {
      isComposing.value = true;
    };
    const getInput = () => {
      return refInput.value || refTextarea.value;
    };

    const focus = () => {
      getInput().focus();
    };

    const blur = () => {
      getInput().blur();
    };

    const select = () => {
      getInput().select();
    };

    function handleBlur(event) {
      focused.value = false;

      // TODO: dispatch to form
      // if (this.validateEvent) {
      //   this.dispatch("ElFormItem", "el.form.blur", [this.value]);
      // }
    }

    function resizeTextarea() {
      // TODO: ssr
      // if (this.$isServer) return;

      if (nativeInputType.value !== "textarea") return;
      if (!state.autosize) {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(refTextarea.value).minHeight
        };
        return;
      }

      const { minRows, maxRows } = state.autosize;
      textareaCalcStyle.value = calcTextareaHeight(
        refTextarea.value,
        minRows,
        maxRows
      );
    }
    const setNativeInputValue = () => {
      const input = getInput();
      if (!input) return;
      if (input.value === nativeInputValue.value) return;
      input.value = nativeInputValue.value;
    };

    const handleFocus = event => {
      focused.value = true;
    };

    const handleCompositionUpdate = event => {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || "";
      isComposing.value = !isKorean(lastCharacter);
    };
    const handleCompositionEnd = event => {
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };

    // TODO: Stop the event from bubbling similar to handleChange
    const handleInput = event => {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.value) return;

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === nativeInputValue.value) return;

      ctx.emit("update:modelValue", event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue);
    };

    // TODO: Stop the event from bubbling
    // https://github.com/vuejs/vue-next/issues/916
    const handleChange = event => {
      // ctx.emit("change", event.target.value);
    };

    const calcIconOffset = place => {
      // let elList = [].slice.call(
      //   this.$el.querySelectorAll(`.el-input__${place}`) || []
      // );
      // if (!elList.length) return;
      // let el = null;
      // for (let i = 0; i < elList.length; i++) {
      //   if (elList[i].parentNode === this.$el) {
      //     el = elList[i];
      //     break;
      //   }
      // }
      // if (!el) return;
      // const pendantMap = {
      //   suffix: "append",
      //   prefix: "prepend"
      // };
      // const pendant = pendantMap[place];
      // if (this.$slots[pendant]) {
      //   el.style.transform = `translateX(${place === "suffix" ? "-" : ""}${
      //     this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth
      //   }px)`;
      // } else {
      //   el.removeAttribute("style");
      // }
    };

    const updateIconOffset = () => {
      calcIconOffset("prefix");
      calcIconOffset("suffix");
    };

    const clear = () => {
      ctx.emit("update:modelValue", "");
      ctx.emit("change", "");
      ctx.emit("clear");
    };

    const handlePasswordVisible = () => {
      state.passwordVisible = !state.passwordVisible;
      focus();
    };

    function getSuffixVisible() {
      return (
        ctx.slots.suffix ||
        state.suffixIcon ||
        state.showClear ||
        state.showPassword ||
        state.isWordLimitVisible ||
        (state.validateState && state.needStatusIcon)
      );
    }

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => {
      setNativeInputValue();

      // when change between <input> and <textarea>,
      // update DOM dependent value and styles
      // https://github.com/ElemeFE/element/issues/14857
      nextTick(resizeTextarea);
      // // TODO: dispatch to form
      if (state.validateEvent) {
        //  this.dispatch("ElFormItem", "el.form.change", [val]);
      }
    });

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(nativeInputType, () => {
      nextTick(() => {
        setNativeInputValue();
        resizeTextarea();
        updateIconOffset();
      });
    });

    // TODO: need to know why
    // created -> use setup()
    // this.$on("inputSelect", this.select);

    onMounted(() => {
      setNativeInputValue();
      resizeTextarea();
      updateIconOffset();
    });

    onUpdated(() => {
      nextTick(updateIconOffset);
    });

    return {
      ...toRefs(state),
      refInput,
      refTextarea,
      getSuffixVisible,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handleInput,
      handleFocus,
      handleBlur,
      handleChange,
      handlePasswordVisible,
      focus,
      blur,
      select,
      clear
    };
  }
});
</script>
