import type { IMailerService } from "../../domain/services/IMailerService.ts";
import transporter from '../mailer/nodemailer.ts';

export class NodeMailerService implements IMailerService{
    async sendPasswordResetToken(email: string, token: string){
        return;
    }

    async sendVerificationEmail(email: string, token: string){
        await transporter.sendMail({
            from: process.env.MAILER_ADDRESS,
            to: email,
            subject: "Vérification d'email",
            html: "<p>Yo bro</p>"
        });
    }
}