import type { UserEntity } from "../../domain/entities/user.js";
import type { IUserRepositories } from "../../domain/repositories/UserRepositories.js";
import { prisma } from "../database/prisma.js";

class PrismaUserRepository implements IUserRepositories{
    
    async findByEmail(email: string): Promise<UserEntity | null>{
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        return user;
    }

    async create(user: UserEntity): Promise<UserEntity>{
        const newUser = await prisma.user.create({
            data: user
        });

        return newUser;
    };
}