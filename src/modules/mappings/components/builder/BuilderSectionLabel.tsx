import * as React from 'react'
import { withTheme } from 'styled-components'
import { ChevronRight, ChevronDown } from 'react-feather'
import { BuilderLabel, ITheme } from 'edikit'

interface IBuilderSectionLabelProps {
    label: string
    isOpened: boolean
    onToggle: () => void
    theme: ITheme
}

class BuilderSectionLabel extends React.Component<IBuilderSectionLabelProps> {
    render() {
        const { label, isOpened, onToggle, theme } = this.props

        const style: any = {
            width: '110px',
            cursor: 'pointer',
            justifyContent: 'space-between',
            transition: 'background 200ms',
            paddingRight: '9px',
            userSelect: 'none',
            background: isOpened ?
                theme.builder.label.background :
                theme.colors.muted
        }

        if (!isOpened) {
            style.boxShadow = 'none'
        }

        return (
            <BuilderLabel
                label={
                    <React.Fragment>
                        <span>{label}</span>
                        {isOpened && (
                            <ChevronDown
                                size={14}
                                style={{
                                    marginLeft: '9px'
                                }}
                            />
                        )}
                        {!isOpened && (
                            <ChevronRight
                                size={14}
                                style={{
                                    marginLeft: '9px'
                                }}
                            />
                        )}
                    </React.Fragment>
                }
                style={style}
                onClick={onToggle}
                withLink={true}
            />
        )
    }
}

export default withTheme(BuilderSectionLabel)
