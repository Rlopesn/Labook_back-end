import { LikeDislikeDB, PostDB, PostUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POST = "post"

    public async findPostById(id: string): Promise<PostDB | undefined> {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POST).where({ id })

        if (!result) {
            return undefined
        }

        const post: PostDB = {
            id: result.id,
            creator_id: result.creator_id,
            content: result.content,
            likes: result.likes,
            dislikes: result.dislikes,
            created_at: result.created_at,
            updated_at: result.updated_at
        }

        return post
    }

    public async findPost():
        Promise<PostUserDB[]> {
        const result: PostUserDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POST)
            .select(
                "post.id",
                "post.creator_id",
                "post.content",
                "post.likes",
                "post.dislikes",
                "post.created_at",
                "post.updated_at",
                "users.id as userId",
                "users.name as userName"
            )
            .from("post")
            .innerJoin("users", "post.creator_id", "users.id")

        return result
    }

    public async createPost(newPostDB: PostDB): Promise<PostDB[]> {
        const result: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPostDB)
        return result
    }

    public async updatePost(id: string, content: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POST).update({content}).where({ id })
    }
    
    public async delete(id: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST).del().where({id})
    }

    public async findLikeDislike(postId: string, userId: string): Promise<LikeDislikeDB>{
       const [result]: LikeDislikeDB[]=  await BaseDatabase.connection("likes_dislikes")
       .where({post_id: postId})
       .andWhere({user_id: userId})
       return result
    }

    public async createLikeDislike(likeDislikeDB:LikeDislikeDB): Promise<void>{
        await BaseDatabase.connection("likes_dislikes")
        .insert(likeDislikeDB).onConflict(['user_id', 'post_id'])
        .merge()
    }

    public async deleteLikeDislike(postId: string, userId: string): Promise<void>{
        await BaseDatabase.connection("likes_dislikes").del()
        .where({post_id: postId})
        .andWhere({user_id: userId})
    }

    public async incrementLike(postId: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .where({id: postId})
        .increment('likes')
    }

    public async decrementLike(postId: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .where({id: postId})
        .decrement('likes')
    }

    public async incrementDislike(postId: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .where({id: postId})
        .increment('dislikes')
    }

    public async decrementDislike(postId: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .where({id: postId})
        .decrement('dislikes')
    }

    public async revertLikeToDislike(postId: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .where({id: postId})
        .increment('dislikes')
        .decrement('likes')
    }

    public async revertDislikeToLike(postId: string): Promise<void>{
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .where({id: postId})
        .increment('likes')
        .decrement('dislikes')
    }
}