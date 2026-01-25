import { AppError } from "../../domain/exceptions/AppError.ts";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.ts";
import type { IOTPService } from "../../domain/security/IOTPService.ts";

export class CodeOTPVerify{
    private userRepository: IUserRepositories;
    private otpService: IOTPService;

    constructor(repository: IUserRepositories, otpServices: IOTPService){
        this.userRepository = repository;
        this.otpService = otpServices;
    }

    async execute(token: string, userId: string){
        const user2FASecret = await this.userRepository.findSecretByUserId(userId);
        if(!user2FASecret) throw new AppError('TWO FACTOR AUTHENTIFACTION NOT AVAILABLE', 400);

        const isValid = this.otpService.verifyOTPCode(token, user2FASecret);
        if(!isValid) throw new AppError('2FA CODE INVALID', 400);

        return true;
    }
}