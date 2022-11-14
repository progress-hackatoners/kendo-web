export declare class KendoList extends HTMLUListElement {
    private _dataSource;
    private _dataTextField;
    private _dataValueField;
    private _rendered?;
    private _value?;
    selectedItemElm?: KendoListItem;
    items: Array<KendoListItem>;
    list?: HTMLElement;
    set value(val: any);
    get value(): any;
    set dataSource(val: any);
    get dataSource(): any;
    set dataTextField(val: string);
    get dataTextField(): string;
    set dataValueField(val: string);
    get dataValueField(): string;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    render(): void;
    signal(prop: string): void;
    bind(): void;
    events(): void;
    _click(ev: any): void;
    _createItem(d: any): void;
    _dispatchChange(): void;
    _selectItem(): void;
    _dispatchDataBound(): void;
}
declare class KendoListItem extends HTMLLIElement {
    private textElm;
    private _text?;
    private _value?;
    private _selected;
    set text(val: string);
    get text(): string;
    set selected(val: boolean);
    get selected(): boolean;
    set value(val: any);
    get value(): any;
    constructor();
    connectedCallback(): Promise<void>;
    signal(prop: string): void;
}
export {};
