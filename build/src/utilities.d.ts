export interface ITValidator<T> {
    (input: string, options: T): boolean;
}
export declare function readLine(question: string): Promise<string>;
export declare function readLineAndValidate<T>(question: string, validator: ITValidator<T> | undefined, options: T): Promise<string>;
