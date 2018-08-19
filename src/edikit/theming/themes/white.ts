import 'brace/theme/github'
import { css } from 'styled-components'
import { ITheme, IThemeColors, IThemeTypography } from '../types'

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
    background: '#f8f8f8',
    text: '#555',
    border: '#ddd',
    accent: '#2b5fc5',
    overAccent: '#e6e9f5',
    muted: '#aaa',
    success: '#27e227',
    overSuccess: '#105b10',
    warning: '#ffb400',
    overWarning: '#7b3204',
    danger: '#e21702',
    overDanger: '#fff',
}

const theme: ITheme = {
    typography,
    colors,
    tree: {
        container: {
            background: 'transparent',
        },
        item: {
            color: colors.text,
            hover: {
                background: '#fff',
                color: '#333',
            },
            current: {
                background: '#fff',
                color: '#000',
            },
        },
    },
    builder: {
        spacing: '12px',
        background: '#f8f8f8',
        header: {
            background: '#7286fc',
            title: {
                color: '#fff'
            },
            subtitle: {
                color: 'rgba(255, 255, 255, .65)'
            }
        },
        link: {
            color: '#7286fc'
        },
        label: {
            background: colors.accent,
            color: '#eee',
            css: css`
                box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
            `,
        },
        block: {
            background: '#fff',
            css: css`
                box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            `,
            title: {
            }
        },
    },
    badge: {
        background: '#eee',
        color: '#000',
    },
    header: {
        height: '44px',
        background: '#2b5fc5',
        color: '#fff',
        iconColor: '#fff',
        brandColor: '#fff',
    },
    pane: {
        spacing: '10px',
        css: css`
            transition: box-shadow 300ms;
            box-shadow: 0 0 0 1px rgba(4, 169, 244, 0), 0 0 0 1px rgba(0, 0, 0, .06);
        `,
        current: {
            css: css`
                box-shadow: 0 0 0 5px rgba(4, 169, 244, .08), 0 0 0 1px rgba(4, 169, 244, .25);
            `,
        },
        header: {
            height: '34px',
            background: '#f5f5f5',
            button: {
                background: '#f5f5f5',
                current: {
                    background: '#fff',
                },
            },
        },
        body: {
            background: '#fff'
        }
    },
    editor: {
        theme: 'github',
    },
    form: {
        input: {
            background: '#f5f5f5',
            border: '1px solid #eee',
            color: colors.text,
            css: css`
                border-radius: 2px;
            `,
            placeholder: {
                color: '#aaa',
            },
            hover: {
                border: '1px solid #2196f3',
            },
            focus: {
                background: '#fff',
                border: '1px solid #2196f3',
                css: css`
                    box-shadow: 0 0 0 3px rgba(4, 169, 244, .2);
                `
            },
            disabled: {}
        },
        select: {
            background: 'white',
            arrowsColor: '#2b5fc5',
            addonBackground: 'rgba(4, 169, 244, .08)',
            borderColor: '#ddd',
            color: '#222',
            css: css`
                box-shadow: 0 1px 1px rgba(0, 0, 0, .06);
                
                &:hover {
                    border-color: #2196f3;   
                    box-shadow: 0 0 0 rgba(4, 169, 244, 0); 
                }
            `,
            focus: {
                css: css`
                    border-color: #2196f3;
                    box-shadow: 0 0 0 3px rgba(4, 169, 244, .2);
                `
            },
        },
    },
    notifications: {
        item: {
            background: '#444',
            color: '#eee',
            css: css`
                box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
            `,
        },
    },
}

export default theme
