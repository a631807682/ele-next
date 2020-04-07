import { provide, inject } from "vue";

const formSymbol = Symbol("elForm");
const formItemSymbol = Symbol("elFormItem");

export const provideForm = (form: any) => provide(formSymbol, form);

export const provideFormItem = (formItem: any) =>
  provide(formItemSymbol, formItem);

export const useForm = () => {
  const elForm = inject(formSymbol, {});
  const elFormItem = inject(formItemSymbol, {});
  return { elForm, elFormItem };
};
