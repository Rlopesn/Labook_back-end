import { z } from "zod"

export interface PostCreateInputDTO {
    content: string,
    token: string
}

export const postCreateSchema = z.object({
    content: z.string(),
    token: z.string()
}).transform(data => data as PostCreateInputDTO)