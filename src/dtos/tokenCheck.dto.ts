import { z } from "zod"

export interface TokenCheckInputDTO {
    token: string
}

export const tokenCheckSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as TokenCheckInputDTO)