import 'styled-components'
import { ITheme } from './edikit/theming/types'

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {}
}
