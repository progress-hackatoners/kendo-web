export enum ThemeColor {
    base = 'base', 
    primary = 'primary', 
    secondary = 'secondary',
    tertiary = 'tertiary',
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error',
    dark = 'dark',
    light = 'light',
    inverse = 'inverse',
    none = ''
}

export type ThemeColorKey = keyof typeof ThemeColor;