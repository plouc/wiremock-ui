import * as React from 'react'
import { withTheme } from 'styled-components'
import { Monitor, Settings, GitHub } from 'react-feather'
import { ITheme, Button, IPaneContent } from 'edikit'
import { IData } from '../../../types'
import { Container, Icons, AppName } from './AppBar_styled'

export interface IAppBarProps {
    addContentToCurrentPane(content: IPaneContent<IData>): void
    theme: ITheme
}

class AppBar extends React.Component<IAppBarProps> {
    openSettings = () => {
        this.props.addContentToCurrentPane({
            id: 'settings',
            type: 'settings',
            isCurrent: true,
            isUnique: true,
        })
    }

    visitGithub = () => {
        window.open('https://github.com/plouc/wiremock-ui', '_blank')
    }

    render() {
        const { theme } = this.props

        return (
            <Container>
                <AppName>
                    <Monitor
                        size={18}
                        color={theme.header.iconColor}
                        style={{ marginRight: 9 }}
                    />
                    wiremock:UI
                </AppName>
                <Icons>
                    <Button
                        style={{ marginRight: 12 }}
                        icon={
                            <Settings
                                size={16}
                                color={theme.colors.muted}
                                style={{ marginRight: 6 }}
                            />
                        }
                        onClick={this.openSettings}
                    >
                        settings
                    </Button>
                    <Button
                        style={{ marginRight: 12 }}
                        icon={
                            <GitHub
                                size={16}
                                style={{ marginRight: 6 }}
                            />
                        }
                        onClick={this.visitGithub}
                    >
                        GitHub
                    </Button>
                </Icons>
            </Container>
        )
    }
}

export default withTheme(AppBar)
