import { AppError } from "../../domain/exceptions/AppError.ts";
import type { IOTPService } from "../../domain/security/IOTPService.ts";
import speakeasy from 'speakeasy';
import {toDataURL, type QRCode} from "qrcode";

export class SpeakeasyOTPService implements IOTPService{
    async generateSecret(email: string){
        const secret = speakeasy.generateSecret({
            length: 20,
            name: `MulticaseAuth:${email}`,
            issuer: "MulticaseAuth"
        });

        const qrcode = secret.otpauth_url;
        if(!qrcode) throw new AppError('QRCODE TRANSFORMATION FAILED', 500);
        
        const qrcode_url = await qrcode;

        return { secret: secret.base32, qrcode: await toDataURL(qrcode_url) };
    }

    verifyOTPCode(otp_code: string, secret: string){
        return speakeasy.totp.verify({
            secret: String(secret),
            encoding: 'base32',
            token: otp_code
        });
    }
}

const test = new SpeakeasyOTPService();
console.log(await test.generateSecret("test@gmail.com"));