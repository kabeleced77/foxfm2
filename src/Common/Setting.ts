export interface ISetting<T> {
    key(): String;
    value(): Promise<T>;
    defaultValue(): T;
    change(value: T): Promise<void>;
}
