import 'brace'
import 'brace/theme/solarized_dark'
import { css } from 'styled-components'
import { IThemeTypography, IThemeColors, ITheme } from '../types'

const typography: IThemeTypography = {
    fontSize: '14px',
    lineHeight: '1.6em',
    default: {
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    },
    mono: {
        fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
    },
}

const colors: IThemeColors = {
    background: '#001b21',
    text: '#eee',
    border: '#001b21',
    accent: '#48ceee',
    overAccent: '#00222b',
    muted: '#357586',
    success: '#afd327',
    overSuccess: '#00222b',
    warning: '#cb8d10',
    overWarning: '#00222b',
    danger: '#ff4c3f',
    overDanger: '#00222b',
}

const theme: ITheme = {
    typography,
    colors,
    tree: {
        container: {
            background: '#00171c',
        },
        item: {
            color: colors.text,
            hover: {
                background: '#012835',
                color: '#fff',
            },
            current: {
                background: '#01313f',
                color: '#fff',
            },
        },
    },
    builder: {
        spacing: '12px',
        background: '#012833',
        header: {
            background: '#013340',
            title: {
                color: '#fff',
            },
            subtitle: {
                color: colors.muted
            }
        },
        link: {
            color: '#316878',
        },
        label: {
            background: colors.accent,
            color: colors.background
        },
        block: {
            background: '#013340',
            css: css`
                box-shadow: 0 1px 2px #001b21;
            `,
            title: {

            }
        },
    },
    badge: {
        background: '#001b21',
        color: 'inherit',
    },
    header: {
        height: '44px',
        background: colors.background,
        color: colors.text,
        iconColor: colors.accent,
        brandColor: colors.text,
    },
    pane: {
        spacing: '12px',
        css: css`
            transition: box-shadow 300ms;
            box-shadow: 0 0 0 0 #00171c;
        `,
        current: {
            css: css`
                box-shadow: 0 0 0 3px #001014;
            `,
        },
        header: {
            height: '34px',
            background: '#001b21',
            button: {
                background: '#00222b',
                current: {
                    background: '#013340',
                },
            },
        },
        body: {
            background: '#012833'
        }
    },
    editor: {
        theme: 'solarized_dark',
    },
    form: {
        input: {
            background: '#01212c',
            border: 'none',
            color: colors.text,
            css: css`
                border-radius: 2px;
            `,
            placeholder: {
                color: '#2f5968',
            },
            hover: {
            },
            focus: {
                background: '#011b25',
            },
            disabled: {}
        },
        select: {
            background: '#01586a',
            color: '#ffffff',
            borderColor: '#011e25',
            addonBackground: '#014c5e',
            css: css`
                box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            `,
            focus: {

            },
        },
    },
    notifications: {
        item: {
            background: '#014f60',
            css: css`
                border: 2px solid #011e25;
            `
        },
    },
}

export default theme
