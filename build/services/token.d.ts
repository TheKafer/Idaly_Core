export declare class PasswordManager {
    static toHash(password: string): Promise<string>;
    static compare(storePassword: string, suppliedPassword: string): Promise<boolean>;
}
