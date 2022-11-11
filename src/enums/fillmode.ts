export enum FillMode {
    solid = 'solid', 
    outline = 'outline', 
    link = 'link',
    none = ''
}

export type FillModeKey = keyof typeof FillMode;