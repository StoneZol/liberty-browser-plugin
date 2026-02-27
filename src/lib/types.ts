import { z } from "zod"

export const LibertyStoreSchema = z.object({
    data: z.object({
        user: z.enum(['anon']),
        contacts: z.array(z.object({
            seedHash: z.string(),
            tag: z.string(),
            noiseLength: z.number(),
            description: z.string(),
        }))
    })
})
export type LibertyStore = z.infer<typeof LibertyStoreSchema>