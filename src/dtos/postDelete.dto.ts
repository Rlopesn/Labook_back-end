import { z } from "zod"

export interface PostDeleteInputDTO {
    id: string,
    token: string
}

export const postDeleteSchema = z.object({
    id: z.string({required_error: "'id' is required."}),
    token: z.string().min(2)
}).transform(data => data as PostDeleteInputDTO)