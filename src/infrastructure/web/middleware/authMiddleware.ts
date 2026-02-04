import type { NextFunction, Response, Request } from "express";
import type { ITokenService } from "../../../domain/security/ITokenService.ts";
import { AppError } from "../../../domain/exceptions/AppError.ts";

export const authMiddleware = (tokenService: ITokenService) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("Je suis ici au moins")
        const authorization = req.headers.authorization;
        
        if(!authorization || !authorization.startsWith('Bearer ')) throw new AppError("UNAUTHORIZED ACCESS", 400);

        const token = authorization.split(' ')[1];

        if(!token) throw new AppError("UNAUTHORIZED ACCESS", 400);
        
        try{
            const decoded = tokenService.verifyAccessToken(token);
            if(!decoded) throw new AppError("UNAUTHORIZED ACCESS", 400);

            console.log("Ici bro");
            req.user = decoded as { userId: string };
            next();
            
        }catch(error: any){
            if(error.name == "SECRET KEY MISSED: ACCESS_KEY" || error.name == "SECRET KEY MISSED: REFRESH_KEY:s") return res.status(500).json({
                message: 'Intern Server secret problem'
            });

            res.status(401).json({
                message: "UNAUTHORIZED ACCESS"
            });
        }
    }
}