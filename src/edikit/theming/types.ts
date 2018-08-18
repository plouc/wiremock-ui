export interface IThemeTypography {
    fontSize: string
    lineHeight: string
    default: {
        fontFamily: string
    }
    mono: {
        fontFamily: string
    }
}

export interface IThemeColors {
    background: string
    text: string
    border: string
    accent: string
    overAccent: string
    muted: string
    success: string
    overSuccess: string
    warning: string
    overWarning: string
    danger: string
    overDanger: string
}

export interface IThemeBadge {
    background: string
    color: string
}

export interface IThemeHeader {
    height: number | string
    background?: string
    color?: string
    iconColor?: string
    brandColor?: string
}

export interface IThemePane {
    spacing: number | string
    css?: any
    current: {
        css?: any
    }
    header: {
        height: number | string
        background: string
        button: {
            background: string
            current: {
                background: string
            }
        }
    }
    body: {
        background: string
        css?: any
    }
}

export interface IThemeTree {
    container: {
        background: string
    }
    item: {
        color: string
        hover: {
            background: string
            color: string
        }
        current: {
            background: string
            color: string
        }
    }
}

export interface IThemeBuilder {
    spacing: number | string
    background?: string
    css?: any
    header: {
        background: string
        css?: any
        title: {
            color?: string
            css?: any
        },
        subtitle: {
            color?: string
            css?: any
        }
    }
    link: {
        color: string
    }
    label: {
        background: string
        color: string
        css?: any
    }
    block: {
        background: string
        css?: any
        title: {
            color?: string
            css?: any
        }
    }
}

export interface IThemeForm {
    input: {
        background?: string
        color?: string
        border?: string
        css?: any
        placeholder: {
            color?: string
        }
        hover: {
            background?: string
            color?: string
            border?: string
            css?: any
        }
        focus: {
            background?: string
            color?: string
            border?: string
            css?: any
        }
        disabled: {
            background?: string
            color?: string
            border?: string
            css?: any
        }
    }
    select: {
        borderColor?: string
        background?: string
        color?: string
        addonBackground?: string
        arrowsColor?: string
        css?: any
        focus: {
            css?: any
        }
    }
}

export interface IThemeNotifications {
    item: {
        background?: string
        color?: string
        css?: any
    }
}

export interface IThemeEditor {
    theme: string
}

export interface ITheme {
    typography: IThemeTypography
    colors: IThemeColors
    badge: IThemeBadge
    header: IThemeHeader
    pane: IThemePane
    tree: IThemeTree
    builder: IThemeBuilder
    editor: IThemeEditor
    form: IThemeForm
    notifications: IThemeNotifications
}
