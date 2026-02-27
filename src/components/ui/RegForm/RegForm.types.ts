import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type RegFormProps = {}

export const RegFormSchema = z
    .object({
        Password: z.string().min(8),
        ConfirmPassword: z.string().min(8),
        AlertPassword: z.string().min(8),
        ConfirmAlertPassword: z.string().min(8),
    })
    .superRefine((data, ctx) => {
        if (data.Password !== data.ConfirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['ConfirmPassword'],
                message: 'Passwords must match',
            });
        }

        if (data.AlertPassword !== data.ConfirmAlertPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['ConfirmAlertPassword'],
                message: 'Alert passwords must match',
            });
        }
    });

export type RegFormSchemaType = z.infer<typeof RegFormSchema>;