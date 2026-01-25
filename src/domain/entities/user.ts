export interface UserEntity {
    id: string,
    email: string,
    password: string | null | undefined,
    emailVerifiedAt: Date | null,
    twoFactorEnabledAt: Date | null,
    twoFactorSecret: string | null,
    disabledAt: Date | null,
    createdAt: Date,
    updatedAt: Date
}