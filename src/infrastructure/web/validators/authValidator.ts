import { z } from 'zod';

export const registerSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string().min(8, "Le mot de passe est trop court.")
});