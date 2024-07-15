import {z} from 'zod';

export const userNameValidation = z
    .string()
    .min(2,"Username is too short")
    .max(20,"Username is too long")
    

export const signUpSchema = z.object({
    username:userNameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,"password must be more than 6 character"),
})