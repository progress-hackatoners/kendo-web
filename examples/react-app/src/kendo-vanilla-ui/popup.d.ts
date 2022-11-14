export declare class KendoPopup extends HTMLDivElement {
    private _anchor;
    private _anchorElm?;
    private _rendered?;
    wrapper?: HTMLElement;
    set anchor(value: string | HTMLElement);
    get anchor(): string | HTMLElement;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    render(): void;
    signal(prop: string, newValue: string, oldValue: string): void;
    hide(): void;
    show(): void;
    toggle(): void;
    private position;
}
