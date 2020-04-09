import { provide, inject } from "vue";

const formSymbol = Symbol("elForm");
const formItemSymbol = Symbol("elFormItem");

export const provideForm = (form: any) => provide(formSymbol, form);

export const provideFormItem = (formItem: any) =>
  provide(formItemSymbol, formItem);

export const useForm = () => {
  const elForm = inject(formSymbol, {} as any);
  const elFormItem = inject(formItemSymbol, {} as any);
  return { elForm, elFormItem };
};
