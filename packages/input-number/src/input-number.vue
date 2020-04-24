<template>
  <div
    @dragstart.prevent
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight },
    ]"
  >
    <span
      class="el-input-number__decrease"
      role="button"
      v-if="controls"
      v-repeat-click="decrease"
      :class="{ 'is-disabled': minDisabled }"
      @keydown.enter="decrease"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="el-input-number__increase"
      role="button"
      v-if="controls"
      v-repeat-click="increase"
      :class="{ 'is-disabled': maxDisabled }"
      @keydown.enter="increase"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <el-input
      ref="input"
      :modelValue="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    ></el-input>
  </div>
</template>
<script lang="ts">
import { Input } from 'packages/input'
import { isNumber } from 'src/utils/share'
import { useForm } from 'src/utils/injection/form'
// import Focus from 'element-ui/src/mixins/focus'
import RepeatClick from 'src/directives/repeat-click'
import {
  defineComponent,
  reactive,
  watch,
  computed,
  toRefs,
  PropType,
  onMounted,
  ref,
} from 'vue'

export type InputNumberSize = 'large' | 'small'

export default defineComponent({
  name: 'ElInputNumber',
  //   mixins: [Focus('input')],
  directives: {
    repeatClick: RepeatClick,
  },
  components: {
    ElInput: Input,
  },

  emits: {
    'update:modelValue': (val: Number) => {
      if (isNumber(val)) {
        return true
      }
      console.warn('update:modelValue error', val)
      return false
    },
    input: (val: Number) => {
      if (isNumber(val)) {
        return true
      }
      console.warn('input error', val)
      return false
    },
    change: (val: number, oldVal: number) => {
      console.log('change check', val, oldVal)
      if (isNumber(val) && isNumber(oldVal)) {
        return true
      }
      console.warn('change error', val, oldVal)
      return false
    },
    blur: null,
    focus: null,
  },

  props: {
    modelValue: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
    stepStrictly: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },

    disabled: Boolean,
    size: String as PropType<InputNumberSize>,
    controls: {
      type: Boolean,
      default: true,
    },
    controlsPosition: {
      type: String,
      default: '',
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (val: any) => {
        return val >= 0 && val === parseInt(val as string, 10)
      },
    },
  },

  setup(props, ctx) {
    const { disabled, size } = useForm(props)
    const input = ref(null)

    const modelValue = computed(() => {
      return props.modelValue === undefined
        ? props.modelValue
        : Number(props.modelValue)
    })

    const state = reactive({
      inputNumberSize: size,
      inputNumberDisabled: disabled,
      modelValue,
      currentValue: 0,
      userInput: null,
      numPrecision: computed(() => {
        const { step, precision } = props
        const stepPrecision = getPrecision(step)
        if (precision !== undefined) {
          if (stepPrecision > precision) {
            console.warn(
              '[Element Warn][InputNumber] precision should not be less than the decimal places of step'
            )
          }
          return precision
        } else {
          return Math.max(getPrecision(modelValue.value), stepPrecision)
        }
      }),
      minDisabled: computed(() => {
        return (
          _decrease(modelValue.value, props.step, state.numPrecision) <
          props.min
        )
      }),
      maxDisabled: computed(() => {
        return (
          _increase(modelValue.value, props.step, state.numPrecision) >
          props.max
        )
      }),
      controlsAtRight: computed(() => {
        return props.controls && props.controlsPosition === 'right'
      }),

      displayValue: computed(() => {
        console.log('displayValue', state.userInput)
        if (state.userInput !== null) {
          return state.userInput
        }
        let currentValue = state.currentValue
        if (isNumber(currentValue)) {
          if (props.stepStrictly) {
            const stepPrecision = getPrecision(props.step)
            const precisionFactor = Math.pow(10, stepPrecision)
            currentValue =
              (Math.round(currentValue / props.step) *
                precisionFactor *
                props.step) /
              precisionFactor
          }
          if (props.precision !== undefined) {
            currentValue = currentValue.toFixed(props.precision)
          }
        }
        return currentValue
      }),
    })

    const setCurrentValue = (newVal) => {
      const oldVal = state.currentValue
      if (typeof newVal === 'number' && props.precision !== undefined) {
        newVal = toPrecision(newVal, props.precision)
      }
      if (newVal >= props.max) newVal = props.max
      if (newVal <= props.min) newVal = props.min
      if (oldVal === newVal) return
      state.userInput = null
      ctx.emit('input', newVal)
      ctx.emit('change', newVal, oldVal)
      ctx.emit('update:modelValue', newVal)
      state.currentValue = newVal
    }

    const increase = () => {
      if (state.inputNumberDisabled || state.maxDisabled) return
      const value = modelValue.value || 0
      const newVal = _increase(value, props.step, state.numPrecision)
      setCurrentValue(newVal)
    }

    const decrease = () => {
      if (state.inputNumberDisabled || state.minDisabled) return
      const value = modelValue.value || 0
      const newVal = _decrease(value, props.step, state.numPrecision)
      setCurrentValue(newVal)
    }

    watch(
      modelValue,
      (value) => {
        if (value !== undefined) {
          if (isNaN(value)) {
            return
          }

          if (props.stepStrictly) {
            const stepPrecision = getPrecision(props.step)
            const precisionFactor = Math.pow(10, stepPrecision)
            value =
              (Math.round(value / props.step) * precisionFactor * props.step) /
              precisionFactor
          }

          if (props.precision !== undefined) {
            value = toPrecision(value, props.precision)
          }
        }
        if (value >= props.max) value = props.max
        if (value <= props.min) value = props.min
        state.currentValue = value
        state.userInput = null
        ctx.emit('input', value)
      },
      {
        immediate: true,
      }
    )
    const handleBlur = (event) => {
      console.log('handleBlur')
      ctx.emit('blur', event)
    }
    const handleFocus = (event) => {
      console.log('handleFocus')
      ctx.emit('focus', event)
    }

    const handleInput = (value) => {
      console.log('handleInput')
      state.userInput = value
    }
    const handleInputChange = (value) => {
      console.log('handleInputChange', value)
      const newVal = value === '' ? undefined : Number(value)
      if (!isNaN(newVal) || value === '') {
        setCurrentValue(newVal)
      }
      state.userInput = null
    }
    const select = () => {
      input.value.select()
    }

    onMounted(() => {
      // const instance = getCurrentInstance()
      // let innerInput = instance.refs.input.refs.input
      // let innerInput = this.$refs.input.$refs.input;
      //       innerInput.setAttribute('role', 'spinbutton');
      //       innerInput.setAttribute('aria-valuemax', this.max);
      //       innerInput.setAttribute('aria-valuemin', this.min);
      //       innerInput.setAttribute('aria-valuenow', this.currentValue);
      //       innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
    })

    return {
      ...toRefs(state),
      input,
      increase,
      decrease,
      handleInput,
      handleInputChange,
      handleBlur,
      handleFocus,
      select,
    }
  },
})

function toPrecision(num: number, precision: number) {
  return parseFloat(
    String(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision))
  )
}

function getPrecision(value: number | undefined) {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

function _increase(
  val: number | undefined,
  step: number,
  numPrecision: number
) {
  // if (typeof val !== 'number' && val !== undefined) return this.currentValue

  const precisionFactor = Math.pow(10, numPrecision)
  // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
  return toPrecision(
    (precisionFactor * val + precisionFactor * step) / precisionFactor,
    numPrecision
  )
}
function _decrease(
  val: number | undefined,
  step: number,
  numPrecision: number
) {
  // if (typeof val !== 'number' && val !== undefined) return this.currentValue

  const precisionFactor = Math.pow(10, numPrecision)

  return toPrecision(
    (precisionFactor * val - precisionFactor * step) / precisionFactor,
    numPrecision
  )
}

// export default {

//     computed: {

//     },
//     methods: {
//       toPrecision(num, precision) {
//         if (precision === undefined) precision = this.numPrecision;
//         return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
//       },

//     },
//     mounted() {

//     },
//     updated() {
//       if (!this.$refs || !this.$refs.input) return;
//       const innerInput = this.$refs.input.$refs.input;
//       innerInput.setAttribute('aria-valuenow', this.currentValue);
//     }
//   };
</script>
