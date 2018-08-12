import * as React from 'react'
import { withTheme } from 'styled-components'
import { Container, Grid, Title, Item } from './Settings_styled'
import { ISettings } from './schemas'

export interface ISettingsProps {
    settings: ISettings
    themes: string[]
    defineSetting: (key: string, value: string | boolean | number) => void
    theme: any
}

class Settings extends React.Component<ISettingsProps> {
    defineSetting = (key: string, value: string | boolean | number) => () => {
        this.props.defineSetting(key, value)
    }

    render() {
        const { settings, themes } = this.props

        return (
            <Container>
                <Grid>
                    <div>
                        <Title>Theme</Title>
                        {themes.map((t: string) => (
                            <Item
                                key={t}
                                onClick={this.defineSetting('theme', t)}
                                isActive={t === settings.theme}
                            >
                                {t}
                            </Item>
                        ))}
                    </div>
                </Grid>
            </Container>
        )
    }
}

export default withTheme(Settings)
