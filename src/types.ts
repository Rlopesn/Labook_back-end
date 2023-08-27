import { USER_ROLES } from "./models/User"

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface PostUserDB extends PostDB {
    userId: string,
    userName: string
}

export interface LikeDislikeDB {
    post_id: string,
    user_id: string,
    like: number
}