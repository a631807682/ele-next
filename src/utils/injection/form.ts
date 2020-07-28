import { provide, inject, computed, getCurrentInstance, Ref } from 'vue'
import { ElementUIComponentSize, ElementUIProp } from 'src/component'

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

  const $ELEMENT = getCurrentInstance()['ctx']['$ELEMENT'] as Ref<ElementUIProp>

  const validateState = computed<string>(() => {
    return elFormItem ? elFormItem.validateState : ''
  })

  const _size = computed<string>(() => {
    return size || elFormItem.elFormItemSize || $ELEMENT.value.size
  })

  const needStatusIcon = computed<boolean>(() => {
    return elForm.statusIcon || false
  })

  const _disabled = computed<boolean>(() => {
    return disabled || elForm.disabled
  })

  return { validateState, size: _size, needStatusIcon, disabled: _disabled }
}
