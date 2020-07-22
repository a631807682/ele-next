<template>
  <span class="el-breadcrumb__item">
    <span
      :class="['el-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link"
    >
      <slot></slot>
    </span>
    <i
      v-if="separatorClass"
      class="el-breadcrumb__separator"
      :class="separatorClass"
    ></i>
    <span v-else class="el-breadcrumb__separator" role="presentation">{{
      separator
    }}</span>
  </span>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  inject,
  ref,
  Ref,
  getCurrentInstance,
} from 'vue'
import { propsSymbol } from './propsKey'

export default defineComponent({
  name: 'ElBreadcrumbItem',
  props: {
    to: {},
    replace: Boolean,
  },
  setup(props, ctx) {
    const separator = ref('')
    const separatorClass = ref('')
    const link: Ref<HTMLElement | null> = ref(null)

    const propsData: any = inject(propsSymbol)

    const instance = getCurrentInstance()
    const router = (instance.proxy as any).$router

    if (router === undefined) {
      console.warn(`[Element Warn]: "router" is undefined, mount router on globalProperties:
VueApp.use(router)
VueApp.config.globalProperties.$router = router`)
    }

    onMounted(() => {
      separator.value = propsData.separator
      separatorClass.value = propsData.separatorClass

      link.value.addEventListener('click', (_) => {
        const to = props.to
        if (!to) return
        props.replace ? router.replace(to) : router.push(to)
      })
    })

    return {
      separator,
      separatorClass,
      link,
    }
  },
})
</script>
