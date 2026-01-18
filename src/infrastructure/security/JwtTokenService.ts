import type { ITokenService } from "../../domain/security/ITokenService.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv-ts';

dotenv.config();

class JwtTokenService implements ITokenService{

    generateAccessToken(payload: { userId: string }){
        const access_key = process.env.ACCESS_KEY_SECRET;
        let token = "";
        if(access_key){
            token = jwt.sign(payload, access_key, { expiresIn: "15m"});
        }
        return token;
    }

    generateRefreshToken(payload: { userId: string }){
        const refresh_key = process.env.REFRESH_KEY_SECRET;
        let token = "";
        if(refresh_key){
            token = jwt.sign(payload, refresh_key, { expiresIn: "7d" });
        }
        return token;
    }

    verifyToken(token: string){
        return 0;
    }
}