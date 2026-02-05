import { AppError } from "../../domain/exceptions/AppError.ts";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.ts";
import type { IOTPService } from "../../domain/security/IOTPService.ts";
import type { ITokenService } from "../../domain/security/ITokenService.ts";

export class CodeOTPVerify{
    private userRepository: IUserRepositories;
    private otpService: IOTPService;
    private tokenService: ITokenService;

    constructor(repository: IUserRepositories, otpServices: IOTPService, tokenService: ITokenService){
        this.userRepository = repository;
        this.otpService = otpServices;
        this.tokenService = tokenService;
    }

    async execute(token: string, email: string){
        if(!email) throw new AppError("EMAIL NOT PROVIDED", 400);
        const user2FA = await this.userRepository.findSecretByEmail(email);
        if(!user2FA) throw new AppError('INVAILD CREDENTIALS', 400);

        const twoFactorSecret = user2FA.twoFactorSecret;
        if(!twoFactorSecret) throw new AppError("TWO FACTOR AUTHENTICATION NOT SET UP", 500);

        const isValid = this.otpService.verifyOTPCode(token, twoFactorSecret);
        if(!isValid) throw new AppError('2FA CODE INVALID', 400);

        const access_token = this.tokenService.generateAccessToken({ userId: user2FA.id });
        const refresh_token = this.tokenService.generateRefreshToken({ userId: user2FA.id });

        await this.userRepository.saveRefreshToken(user2FA.id, refresh_token, new Date(Date.now() + (1000 * 7 * 24 * 60 * 60)));

        const user = await this.userRepository.findById(user2FA.id);
        
        return {
            access_token,
            refresh_token,
            user
        };
    }
}