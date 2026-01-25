import { AppError } from "../../domain/exceptions/AppError.ts";
import type { IOTPService } from "../../domain/security/IOTPService.ts";
import speakeasy from 'speakeasy';

export class SpeakeasyOTPService implements IOTPService{
    generateSecret(email: string){
        const secret = speakeasy.generateSecret({
            length: 20,
            name: `MulticaseAuth:${email}`,
            issuer: "MulticaseAuth"
        });

        const qrcode = secret.otpauth_url;
        if(!qrcode) throw new AppError('QRCODE TRANSFORMATION FAILED', 500);
        
        return { secret: secret.base32, qrcode: qrcode };
    }

    verifyOTPCode(otp_code: string, secret: string){
        return speakeasy.totp.verify({
            secret: String(secret),
            encoding: 'base32',
            token: otp_code
        });
    }
}