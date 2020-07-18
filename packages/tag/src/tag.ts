import {
  defineComponent,
  PropType,
  computed,
  getCurrentInstance,
  h,
  renderSlot,
} from 'vue'
import { TagEffect, TagSize, TagType } from './type'
import { ElementUIProp } from 'src/component'

export default defineComponent({
  name: 'ElTag',
  props: {
    text: String, // unused
    closable: Boolean,
    type: {
      default: '',
      type: String as PropType<TagType>,
    },
    hit: Boolean,
    disableTransitions: Boolean, // unrealized
    color: String,
    size: {
      default: '',
      type: String as PropType<TagSize>,
      validator(val: string): boolean {
        return ['medium', 'small', 'mini', ''].includes(val)
      },
    },
    effect: {
      default: 'light',
      type: String as PropType<TagEffect>,
      validator(val: string): boolean {
        return ['dark', 'light', 'plain'].includes(val)
      },
    },
  },
  setup(props, { emit, slots }) {
    // ctx: Private property
    const $ELEMENT = getCurrentInstance()['ctx']['$ELEMENT'] as ElementUIProp

    const tagSize = computed(() => props['size'] || ($ELEMENT || {}).size)

    const classes = computed(() => [
      'el-tag',
      {
        [`el-tag--${props['type']}`]: props['type'],
        [`el-tag--${tagSize.value}`]: tagSize.value,
        [`el-tag--${props['effect']}`]: props['effect'],
        'is-hit': props['hit'],
      },
    ])

    const handleClose = (event: Event): void => {
      event.stopPropagation()
      emit('close', Event)
    }

    return () => {
      const tagEl = h(
        'div',
        {
          class: classes.value,
          style: { backgroundColor: props['color'] },
        },
        [
          renderSlot(slots, 'default'),
          props['closable'] &&
            h('i', {
              class: 'el-tag__close el-icon-close',
              onClick: handleClose,
            }),
        ]
      )

      return tagEl

      /*
      return props['disableTransitions']
        ? tagEl
        : h(Transition, {
          name: 'el-zoom-in-center'
        }, tagEl)
      */
    }
  },
})
