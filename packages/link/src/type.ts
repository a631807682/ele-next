// *.vue files only export object-format components in v3
// i couldn't find a way to export the type directly in <script>

/** Alert type */
export type LinkType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
