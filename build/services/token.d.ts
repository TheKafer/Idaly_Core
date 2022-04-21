export declare class TokenManager {
    static toHash(token: string): Promise<string>;
    static compare(storetoken: string, suppliedtoken: string): Promise<boolean>;
}
