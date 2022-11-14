import type { SizeKey } from './enums/size';
import type { RoundedKey } from './enums/rounded';
import type { FillModeKey } from './enums/fillmode';
import type { ThemeColorKey } from './enums/themecolor';
export declare class KendoButton extends HTMLButtonElement {
    private wrapperPrefix;
    private roundedPrefix;
    private _text;
    private _textElm?;
    private _icon?;
    private _iconElm?;
    private _size;
    private _rounded;
    private _fillMode;
    private _themeColor;
    set text(value: string);
    get text(): string;
    get textElm(): HTMLElement | undefined;
    private set textElm(value);
    set icon(value: string | undefined);
    get icon(): string | undefined;
    get iconElm(): HTMLElement | undefined;
    private set iconElm(value);
    get size(): SizeKey;
    set size(value: SizeKey);
    get rounded(): RoundedKey;
    set rounded(value: RoundedKey);
    get fillMode(): FillModeKey;
    set fillMode(value: FillModeKey);
    get themeColor(): ThemeColorKey;
    set themeColor(value: ThemeColorKey);
    constructor();
    connectedCallback(): Promise<void>;
    render(): void;
    signal(prop: string, newValue: string, oldValue: string): void;
    private renderText;
    private renderIcon;
}
export declare class KendoWebButton extends HTMLElement {
    private _text?;
    private _btn?;
    get text(): any;
    set text(_: any);
    constructor();
    connectedCallback(): Promise<void>;
    signal(prop: string, newValue: string, oldValue: string): void;
}
