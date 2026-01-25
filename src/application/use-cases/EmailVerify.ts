import { AppError } from "../../domain/exceptions/AppError.ts";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.ts";
import jwt from 'jsonwebtoken';
import type { ITokenService } from "../../domain/security/ITokenService.ts";

export class EmailVerify{
    private userRepository: IUserRepositories;
    private tokenService: ITokenService;
    private secretMailApp: string | null;

    constructor(repository: IUserRepositories, tokenService: ITokenService){
        this.userRepository = repository;
        this.tokenService = tokenService;
        this.secretMailApp = process.env.SECRET_MAIL_APP || null;
    }

    async execute(token: string): Promise<{ access_token: string, refresh_token: string }>{
        if(!this.secretMailApp){
            console.log("Clé secrète de mail indisponible");
            throw new AppError('INTERNAL SERVER ERROR', 500);
        }

        const result = await this.userRepository.findVerificationToken(token);

        if(!result) throw new AppError('TOKEN NOT FOUND', 404);
        try{
            // Pour éviter que le jwt.verify lève une exception non traitée
            const decoded = jwt.verify(token, this.secretMailApp);
            if(!decoded) throw new AppError("MAIL VERIFY TOKEN INVALID", 403);
        
            await this.userRepository.activateUser(result.userId);
    
            await this.userRepository.deleteVerificationToken(result.token);

            const access_token = this.tokenService.generateAccessToken({ userId: result.userId });
            const refresh_token = this.tokenService.generateRefreshToken({ userId: result.userId });

            await this.userRepository.saveRefreshToken(result.userId, refresh_token, new Date(Date.now() + (1000 * 7 * 24 * 60 * 60)));
            
            return {
                access_token,
                refresh_token
            }
        }catch(error: any){
            throw new AppError(error, 403);
        }
    }
}