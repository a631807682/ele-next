<script lang="ts">
import {
  defineComponent,
  ref,
  h,
  VNode,
  VNodeNormalizedChildren,
  watch,
} from 'vue'
export default defineComponent({
  name: 'ElTimeline',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const defaultSlot = ctx.slots.default()

    const buildArray = (
      children: VNodeNormalizedChildren,
      reverse: boolean = true
    ): VNode[] => {
      const childArray = []
      for (let index = 0; index < children.length; index++) {
        const element = children[index]
        if (reverse) {
          childArray.unshift(element)
        } else {
          childArray.push(element)
        }
      }
      return childArray
    }

    const reverseSlots = () => {
      defaultSlot.reverse()
      defaultSlot.forEach((element) => {
        element.children = buildArray(element.children, true)
      })
      slots.value = [...defaultSlot]
    }

    const resetSlots = () => {
      slots.value = [...defaultSlot]
    }
    const slots = ref(defaultSlot || [])

    if (props.reverse) {
      reverseSlots()
    } else {
      resetSlots()
    }

    watch(
      () => props.reverse,
      (rev, prevRev) => {
        reverseSlots()
      }
    )

    const classes = {
      'el-timeline': true,
      'is-reverse': props.reverse,
    }
    return () =>
      h(
        'ul',
        {
          class: classes,
        },
        [...slots.value]
      )
  },
})
</script>
