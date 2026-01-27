import { AppError } from "../../domain/exceptions/AppError.ts"

export class GithubRequest {
    private github_id;
    private github_secret;
    private github_callback;

    constructor(){
        if(!process.env.GITHUB_ID) throw new AppError('ENV DATA NOT LOAD', 500);
        if(!process.env.GITHUB_SECRET) throw new AppError('ENV DATA NOT LOAD', 500);
        if(!process.env.GITHUB_CALLBACK) throw new AppError('ENV DATA NOT LOAD', 500);

        this.github_id = process.env.GITHUB_ID;
        this.github_secret = process.env.GITHUB_SECRET;
        this.github_callback = process.env.GITHUB_CALLBACK;
    }

    execute(){
        return {
            redirect_uri: this.github_callback,
            client_id: this.github_id,
            scope: 'user:email'
        }
    }
}