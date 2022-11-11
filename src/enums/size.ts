export enum Size {
    small = 'sm', 
    medium = 'md', 
    large = 'lg',
    none = ''
}

export type SizeKey = keyof typeof Size;