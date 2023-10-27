export class ErrorOr<T, E extends Error> {
    private readonly value: T | undefined;
    private readonly error: E | undefined;

    private constructor(value: T | undefined, error: E | undefined) {
        this.value = value;
        this.error = error;
    }

    static ok<T, E extends Error>(value: T): ErrorOr<T, E> {
        return new ErrorOr<T, E>(value, undefined);
    }

    static err<T, E extends Error>(error: E): ErrorOr<T, E> {
        return new ErrorOr<T, E>(undefined, error);
    }

    isError(): boolean {
        return this.error !== undefined;
    }

    isOk(): boolean {
        return this.value !== undefined;
    }

    unwrap(): T {
        if (this.isError()) {
            throw new Error('Cannot unwrap an error result');
        }
        return this.value as T;
    }

    unwrapErr(): E {
        if (this.isOk()) {
            throw new Error('Cannot unwrapErr an ok result');
        }
        return this.error as E;
    }
}