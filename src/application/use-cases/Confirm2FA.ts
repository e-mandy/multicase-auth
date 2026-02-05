import { AppError } from "../../domain/exceptions/AppError.ts";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.ts";
import type { IOTPService } from "../../domain/security/IOTPService.ts";

export class Confirm2FA{
    private userRepository: IUserRepositories;
    private otpService: IOTPService;

    constructor(repository: IUserRepositories, otpServices: IOTPService){
        this.userRepository = repository;
        this.otpService = otpServices;
    }
    
    async execute(userId: string, otpCode: string){
        const user2FA = await this.userRepository.findById(userId);
        if(!user2FA) throw new AppError("UNAUTHORIZED ACCESS", 401);

        const userSecret = user2FA.twoFactorSecret;
        if(!userSecret) throw new AppError('TWO FACTOR AUTHENTICATION NOT SET UP.', 500);

        const isValid = this.otpService.verifyOTPCode(otpCode, userSecret);
        if(!isValid) throw new AppError('2FA CODE INVALID', 400);

        await this.userRepository.activateUser2FA(userId);

        return true;
    }
}