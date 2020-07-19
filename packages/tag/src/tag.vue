<script lang="ts">
import { defineComponent, PropType, computed, h } from 'vue'
import { TagType, TagSize, TagEffect } from './type'
export default defineComponent({
  name: 'ElTag',
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    type: String as PropType<TagType>,
    hit: {
      type: Boolean,
      default: false,
    },
    disableTransitions: {
      type: Boolean,
      default: false,
    },
    color: String,
    size: String as PropType<TagSize>,
    effect: {
      type: String as PropType<TagEffect>,
      default: 'light' as TagEffect,
      validator: (val: string): boolean => {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1
      },
    },
  },
  setup(props, ctx) {
    const tagSize = computed(() => {
      return props.size
    })
    // methods
    const handleClose = (event) => {
      event.stopPropagation()
      ctx.emit('close', event)
    }
    const handleClick = (e) => {
      ctx.emit('close', e)
    }
    const renderIcon = () => {
      return props.closable
        ? h('i', {
            class: 'el-tag__close el-icon-close',
            onClick: handleClose,
          })
        : null
    }
    return () => {
      const { type, effect, hit, disableTransitions, color } = props
      const classes = [
        'el-tag',
        type ? `el-tag--${type}` : '',
        tagSize ? `el-tag--${tagSize}` : '',
        effect ? `el-tag--${effect}` : '',
        hit && 'is-hit',
      ]
      const tag = h(
        'span',
        {
          style: { backgroundColor: color },
          class: classes,
          onclick: handleClick,
        },
        [renderIcon(), ctx.slots.default && ctx.slots.default()]
      )
      return disableTransitions
        ? h('transition', { name: 'el-zoom-in-center' }, [tag])
        : tag
    }
  },
})
</script>
