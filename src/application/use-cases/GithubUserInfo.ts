import axios from "axios";
import { AppError } from "../../domain/exceptions/AppError.ts";

export class GithubUserInfo {
    private github_url_user = "https://api.github.com/user";

    async execute(access_token: string){
        try{
            const response = await axios.get(this.github_url_user, {
                headers: {
                    'Accept': "application/json",
                    "Authorization": `token ${access_token}`
                }
            });

            return response.data;
        }catch(error: any){
            throw new AppError(error.name, 500);
        }
    }
}