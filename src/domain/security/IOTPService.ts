export interface IOTPService {
    generateSecret: (email: string) => Promise<{secret: string, qrcode: string}>,
    verifyOTPCode: (otp_code: string, secret: string) => boolean
}