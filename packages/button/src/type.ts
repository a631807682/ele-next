// *.vue files only export object-format components in v3
// i couldn't find a way to export the type directly in <script>

/** Button type */
export type ButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

/** Same as native button's type */
export type ButtonNativeType = 'button' | 'submit' | 'reset' | 'menu'
