export declare class TokenManager {
    static generateToken(): Promise<string>;
    static toHash(token: string): Promise<string>;
    static compare(storetoken: string, suppliedtoken: string): Promise<boolean>;
}
