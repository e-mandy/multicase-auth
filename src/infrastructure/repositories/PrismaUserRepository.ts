import type { createUserDto } from "../../domain/dtos/createUserDto.js";
import type { UserEntity } from "../../domain/entities/user.js";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.js";
import { prisma } from "../database/prisma.js";

export class PrismaUserRepository implements IUserRepositories{
    
    async findByEmail(email: string): Promise<UserEntity | null>{
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        return user;
    }

    async create(user: createUserDto): Promise<UserEntity>{
        const newUser = await prisma.user.create({
            data: user
        });

        return newUser;
    };

    async saveRefreshToken(userId: string, token: string, expiresAt: Date){
        await prisma.refreshToken.create({
            data: {
                userId: userId,
                token: token,
                expiresAt: expiresAt
            }
        });
    };
}