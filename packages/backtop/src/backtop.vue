<template>
  <transition name="el-fade-in">
    <div
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        right: styleRight,
        bottom: styleBottom,
      }"
      class="el-backtop"
    >
      <slot>
        <el-icon name="caret-top"></el-icon>
      </slot>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref, onBeforeUnmount } from 'vue'
import { throttle } from 'throttle-debounce'

export default defineComponent({
  name: 'ElBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    target: String,
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
  },
  setup(props, ctx) {
    const cubic = (value) => Math.pow(value, 3)
    const easeInOutCubic = (value) =>
      value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

    let container = null
    let el = null
    const visible = ref(false)

    onMounted(() => {
      init()
      container.addEventListener('scroll', throttledScrollHandler)
    })

    onBeforeUnmount(() => {
      container.removeEventListener('scroll', throttledScrollHandler)
    })

    const styleBottom = computed(() => {
      return `${props.bottom}px`
    })
    const styleRight = computed(() => {
      return `${props.right}px`
    })

    const init = () => {
      container = document
      el = document.documentElement
      if (props.target) {
        el = document.querySelector(props.target)
        if (!el) {
          throw new Error(`target is not existed: ${props.target}`)
        }
        container = el
      }
    }

    const onScroll = () => {
      const scrollTop = el.scrollTop
      visible.value = scrollTop >= props.visibilityHeight
    }

    const throttledScrollHandler = throttle(300, false, onScroll)

    const scrollToTop = () => {
      const beginTime = Date.now()
      const beginValue = el.scrollTop
      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
          rAF(frameFunc)
        } else {
          el.scrollTop = 0
        }
      }
      rAF(frameFunc)
    }

    const handleClick = (event: Event) => {
      scrollToTop()
      ctx.emit('click', event)
    }

    return {
      styleBottom,
      styleRight,
      handleClick,
      visible,
    }
  },
})
</script>
