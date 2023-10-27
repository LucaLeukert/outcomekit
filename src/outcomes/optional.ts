export class Optional<T> {
    private readonly value: T | undefined;

    private constructor(value: T | undefined) {
        this.value = value;
    }

    static some<T>(value: T): Optional<T> {
        return new Optional<T>(value);
    }

    static none<T>(): Optional<T> {
        return new Optional<T>(undefined);
    }

    isSome(): boolean {
        return this.value !== undefined;
    }

    isNone(): boolean {
        return !this.isSome();
    }

    unwrap(): T {
        if (this.isNone()) {
            throw new Error('Cannot unwrap an empty option');
        }
        return this.value as T;
    }

    unwrapOr(defaultValue: T): T {
        return this.isSome() ? this.value as T : defaultValue;
    }
}