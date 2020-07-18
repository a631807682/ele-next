<script lang="ts">
import { defineComponent, PropType, ref, computed, h } from 'vue'
import { AvatarSize, AvatarShape, AvatarFit } from './type'
export default defineComponent({
  name: 'ElAvatar',
  props: {
    size: {
      type: [Number, String] as PropType<AvatarSize>,
      validator: (val: number | string): boolean => {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val)
        }
        return typeof val === 'number'
      },
    },
    shape: {
      type: String as PropType<AvatarShape>,
      default: 'circle',
      validator: (val: string): boolean => {
        return ['circle', 'square'].includes(val)
      },
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String as PropType<AvatarFit>,
      default: 'cover',
      validator: (val: string): boolean => {
        return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(val)
      },
    },
  },
  setup(props, ctx) {
    const isImageExist = ref(true)

    const avatarClass = computed(() => {
      const { size, icon, shape } = props
      let classList = ['el-avatar']

      if (size && typeof size === 'string') {
        classList.push(`el-avatar--${size}`)
      }

      if (icon) {
        classList.push('el-avatar--icon')
      }

      if (shape) {
        classList.push(`el-avatar--${shape}`)
      }

      return classList.join(' ')
    })

    const handleError = () => {
      const { error } = props
      const errorFlag = error ? error() : undefined
      if (errorFlag !== false) {
        isImageExist.value = false
      }
    }

    const renderAvatar = () => {
      const { icon, src, alt, srcSet, fit } = props
      if (isImageExist.value && src) {
        return h('img', {
          src,
          alt,
          style: {
            'object-fit': fit,
          },
          srcSet,
          onError: handleError,
        })
      }

      if (icon) {
        return h('i', { class: icon })
      }
      return ctx.slots.default()
    }

    return () => {
      const { size } = props

      const sizeStyle =
        typeof size === 'number'
          ? {
              height: `${size}px`,
              width: `${size}px`,
              lineHeight: `${size}px`,
            }
          : {}
      return h(
        'span',
        {
          class: avatarClass.value,
          style: sizeStyle,
        },
        renderAvatar()
      )
    }
  },
})
</script>
