import type { IUserRepositories } from "../../domain/repositories/UserRepositories.js";

export class Logout {
    private repository: IUserRepositories;

    constructor(repository: IUserRepositories){
        this.repository = repository;
    }
    
    execute(access_token: string, refresh_token: string){
        //
    }
}