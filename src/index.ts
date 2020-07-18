import { App } from 'vue'
import { ElementUIOptions } from 'src/component'
import { install as Alert } from 'packages/alert'
import { install as Avatar } from 'packages/avatar'
import { install as Backtop } from 'packages/backtop'
import { install as Badge } from 'packages/badge'
import { install as Button } from 'packages/button'
import { install as ButtonGroup } from 'packages/button-group'
import { install as Card } from 'packages/card'
import { install as Col } from 'packages/col'
import { install as Divider } from 'packages/divider'
import { install as Icon } from 'packages/icon'
import { install as Input } from 'packages/input'
import { install as InputNumber } from 'packages/input-number'
import { install as Link } from 'packages/link'
import { install as Progress } from 'packages/progress'
import { install as Row } from 'packages/row'
import { install as Timeline } from 'packages/timeline'
import { install as TimelineItem } from 'packages/timeline-item'

const components = [
  Alert,
  Avatar,
  Backtop,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Divider,
  Icon,
  Input,
  InputNumber,
  Link,
  Progress,
  Row,
  Timeline,
  TimelineItem,
]

export const install = function (app: App, opts = {}) {
  components.forEach((comp) => {
    app.use(comp)
  })

  ElementUIOptions.value = {
    ...ElementUIOptions.value,
    ...opts,
  }
}

export const version = 'v0.0.0-alpha.0'
export * from 'src/component'
export * from 'packages/alert'
export * from 'packages/avatar'
export * from 'packages/backtop'
export * from 'packages/badge'
export * from 'packages/button'
export * from 'packages/button-group'
export * from 'packages/card'
export * from 'packages/col'
export * from 'packages/divider'
export * from 'packages/icon'
export * from 'packages/input'
export * from 'packages/input-number'
export * from 'packages/link'
export * from 'packages/progress'
export * from 'packages/row'
export * from 'packages/timeline'
export * from 'packages/timeline-item'
