export interface IOTPService {
    generateSecret: (email: string) => {secret: string, qrcode: string},
    verifyOTPCode: (otp_code: string, secret: string) => boolean
}