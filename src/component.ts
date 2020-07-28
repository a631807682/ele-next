import { App } from 'vue'

/** ElementUI component common definition */
export declare class ElementUIComponent extends Plugin {
  /** Install component into Vue */
  static install(app: App): void
}

/** Component size definition for button, input, etc */
export type ElementUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type ElementUIHorizontalAlignment = 'left' | 'center' | 'right'

export type ElementUIProp = {
  size: ElementUIComponentSize | ''
  zIndex: Number
}

export const ElementUIOptions = {
  size: '',
  zIndex: 2000,
}
