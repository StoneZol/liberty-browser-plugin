import z from "zod";

export const AuthFormSchema = z.object({
    Password: z.string().min(8),
})

export type AuthFormSchemaType = z.infer<typeof AuthFormSchema>