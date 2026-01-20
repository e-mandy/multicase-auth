import type { IUserRepositories } from "../../domain/repositories/UserRepositories.js";

export class LogoutUser {
    private repository: IUserRepositories;

    constructor(repository: IUserRepositories){
        this.repository = repository;
    }
    
    async execute(refresh_token: string){
        await this.repository.revokeRefreshToken(refresh_token);
    }
}