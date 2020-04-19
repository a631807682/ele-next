import { provide, inject, computed } from 'vue'
import { ElementUIOptions, ElementUIComponentSize } from 'src/component'

const formSymbol = Symbol('elForm')
const formItemSymbol = Symbol('elFormItem')

export const provideForm = (form: any) => provide(formSymbol, form)

export const provideFormItem = (formItem: any) =>
  provide(formItemSymbol, formItem)

export const useForm = ({
  size,
  disabled,
}: {
  size?: ElementUIComponentSize
  disabled?: Boolean
}) => {
  const elForm = inject(formSymbol, {} as any)
  const elFormItem = inject(formItemSymbol, {} as any)

  const validateState = computed(() => {
    return elFormItem ? elFormItem.validateState : ''
  })

  const _size = computed(() => {
    return size || elFormItem.elFormItemSize || ElementUIOptions.value.size
  })

  const needStatusIcon = computed(() => {
    return elForm.statusIcon || false
  })

  const _disabled = computed(() => {
    return disabled || elForm.disabled
  })

  return { validateState, size: _size, needStatusIcon, disabled: _disabled }
}
