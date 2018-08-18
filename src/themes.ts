import {
    ITheme,
    blackTheme,
    solarizedDarkTheme,
    whiteTheme,
} from 'edikit'

const themes: { [name: string]: ITheme } = {
    black: blackTheme,
    'solarized dark': solarizedDarkTheme,
    white: whiteTheme,
}

export default themes
