declare module 'react-split-pane' {
    import * as React from 'react'

    interface SplitPaneProps {
        split?: 'vertical' | 'horizontal'
        defaultSize?: number | string
        minSize?: number | string
        maxSize?: number | string
        primary?: 'first' | 'second'
        children?: React.ReactNode
        className?: string
        style?: React.CSSProperties
        onChange?: (newSize: number) => void
    }

    export default class SplitPane extends React.Component<SplitPaneProps> {}
}
