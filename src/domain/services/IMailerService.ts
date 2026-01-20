export interface IMailerService {
    sendVerificationEmail: (email: string, token: string) => Promise<void>,
    sendPasswordResetToken: (email: string, token: string) => Promise<void>
}