import 'brace/theme/chaos'
import { ITheme, IThemeColors, IThemeTypography } from '../types'
import {css} from "styled-components";

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
    background: '#111',
    text: '#ddd',
    border: '#222',
    accent: '#803aff',
    overAccent: '#e6e9f5',
    muted: '#666',
    success: '#00ff57',
    overSuccess: '#000',
    warning: '#ffb400',
    overWarning: '#000',
    danger: '#b32c00',
    overDanger: '#000',
}

const theme: ITheme = {
    typography,
    colors,
    tree: {
        container: {
            background: '#000',
        },
        item: {
            color: colors.text,
            hover: {
                background: '#111111',
                color: '#fff',
            },
            current: {
                background: '#191225',
                color: '#fff',
            },
        },
    },
    builder: {
        spacing: '12px',
        background: '#111',
        header: {
            background: '#000',
            title: {
                color: '#fff'
            },
            subtitle: {
                color: colors.muted
            }
        },
        link: {
            color: '#612fc1'
        },
        label: {
            background: colors.accent,
            color: '#fff'
        },
        block: {
            background: '#000',
            css: css`
                border: 2px solid #111;
            `,
            title: {

            }
        },
    },
    badge: {
        background: '#222',
        color: '#fff',
    },
    header: {
        height: '44px',
        background: '#000',
        iconColor: '#955fff',
    },
    pane: {
        spacing: '14px',
        css: css`
            transition: box-shadow 300ms;
            box-shadow: 0 0 0 1px rgba(128, 58, 255, 0), 0 0 0 1px rgba(128, 58, 255, 0);
        `,
        current: {
            css: css`
                box-shadow: 0 0 0 5px rgba(128, 58, 255, .08), 0 0 0 1px rgba(128, 58, 255, .15);
            `,
        },
        header: {
            height: '34px',
            background: '#111',
            button: {
                background: '#111',
                current: {
                    background: '#000',
                },
            },
        },
        body: {
            background: '#000'
        }
    },
    editor: {
        theme: 'chaos',
    },
    form: {
        input: {
            background: '#111',
            color: colors.text,
            css: css`
                border-radius: 2px;
                box-shadow: 0 0 0 0 rgba(128, 58, 255, 0);
            `,
            placeholder: {
                color: '#444',
            },
            hover: {
                background: '#222',
            },
            focus: {
                background: '#000',
                css: css`
                    box-shadow: 0 0 0 2px rgba(128, 58, 255, .5);
                `,
            },
            disabled: {},
        },
        select: {
            background: '#111',
            color: '#fff',
            addonBackground: 'rgba(128, 58, 255, .25)',
            arrowsColor: '#9660ff',
            borderColor: '#000',
            css: css`
                &:hover {
                    background: #222;
                }
            `,
            focus: {
                css: css`
                    background: #000;
                    box-shadow: 0 0 0 2px rgba(128, 58, 255, .5);
                `,
            },
        },
    },
    notifications: {
        item: {
            background: '#222',
            color: '#fff',
        },
    },
}

export default theme
