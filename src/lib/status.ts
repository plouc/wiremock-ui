import { IThemeColors } from 'edikit'

const mapping = {
    'ok': 'success',
    'ko': 'danger',
    'warn': 'warning',
    'none': 'muted',
}

export const getColorForStatus = (colors: IThemeColors, status?: 'ok' | 'ko' | 'warn' | 'none') => {
    if (status === undefined || status === null) {
        return colors.accent
    }

    return colors[mapping[status]]
}
