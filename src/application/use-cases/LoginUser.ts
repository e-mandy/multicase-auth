import type { UserEntity } from "../../domain/entities/user.js";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.js";
import bcrypt from 'bcrypt';
import type { ITokenService } from "../../domain/security/ITokenService.js";

export class LoginUser {
    userRepository: IUserRepositories;
    tokenService: ITokenService;

    constructor(repository: IUserRepositories, tokenService: ITokenService){
        this.userRepository = repository;
        this.tokenService = tokenService;
    }

    async execute(email: string, password: string): Promise<{ user: UserEntity, access_token: string, refresh_token: string }>{
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new Error("INVALID CREDENTIALS");

        if(!user.password) throw new Error("INVALID CREDENTIALS");

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched) throw new Error("INVALID CREDENTIALS")

        const access_token = this.tokenService.generateAccessToken({ userId: user.id });
        const refresh_token = this.tokenService.generateRefreshToken({ userId: user.id });

        await this.userRepository.saveRefreshToken(user.id, refresh_token, new Date(Date.now() + (1000 * 7 * 24 * 60 * 60)));

        return {
            user: user,
            access_token,
            refresh_token
        }
    }
}