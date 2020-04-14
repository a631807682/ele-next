import { ref, getCurrentInstance, computed, Ref } from "vue";
export function useFocus() {
  // Ref<{ focus(): void; blur(): void } | null>
  const focusable = ref(null);
  const isFocused: Ref<boolean> = ref(false);
  const { emit } = getCurrentInstance();
  function focus() {
    if (!isFocused.value) {
      focusable.value?.focus();
      isFocused.value = true;
      emit("focus");
    }
  }
  function blur() {
    if (isFocused.value) {
      focusable.value?.blur();
      isFocused.value = false;
      emit("blur");
    }
  }
  return {
    focusable,
    focus,
    blur,
    isFocused: computed(() => isFocused.value),
  };
}
