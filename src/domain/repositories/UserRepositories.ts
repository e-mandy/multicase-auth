import type { UserEntity } from "../entities/user.js";


export interface IUserRepositories {
    findByEmail: (email: string) => Promise<UserEntity | null>,
    create: (user: UserEntity) => Promise<UserEntity>
}