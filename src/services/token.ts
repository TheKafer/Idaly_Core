import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class TokenManager {
    static async generateToken() {
        return randomBytes(24).toString('hex');
    }

    static async toHash(token: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(token, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storetoken: string, suppliedtoken: string) {
        const [hashedtoken, salt] = storetoken.split('.');
        const buf = (await scryptAsync(suppliedtoken, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedtoken;
    }
}
