export interface UserEntity {
    id: string,
    email: string,
    password: string | null,
    emailVerifiedAt: Date | null,
    twoFactorEnabledAt: Date | null,
    disabledAt: Date | null,
    createdAt: Date,
    updatedAt: Date
}