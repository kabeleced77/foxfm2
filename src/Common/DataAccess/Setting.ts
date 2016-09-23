export interface ISetting<T> {
    key(): String;
    value(): Promise<String>;
    defaultValue(): T;
    change(value: T): Promise<void>;
}