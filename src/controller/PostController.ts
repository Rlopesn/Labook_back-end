import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { BaseError } from '../errors/BaseError'
import { BadRequestError } from '../errors/BadRequestError'
import { postUpdateSchema } from '../dtos/postUpdate.dto'
import { ZodError } from 'zod'
import { postCreateSchema } from '../dtos/postCreate.dto'
import { tokenCheckSchema } from '../dtos/tokenCheck.dto'
import { postDeleteSchema } from '../dtos/postDelete.dto'
import { likeDislikeSchema } from '../dtos/postLikeDislike.dto'

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }
    public create = async (req: Request, res: Response) => {

        try {

            const input = postCreateSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })
            
            await this.postBusiness.create(input)

            res.sendStatus(201)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {

            const input = tokenCheckSchema.parse({
                token: req.headers.authorization
            })

            const result = await this.postBusiness.getAll(input)

            res.status(200).send(result)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public update = async (req: Request, res: Response) => {
        try {

            const input = postUpdateSchema.parse({
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })


            await this.postBusiness.update(input)


            res.status(200).send({ message: "Updated" })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const input = postDeleteSchema.parse({
                id:req.params.id,
                token: req.headers.authorization
            })

            await this.postBusiness.delete(input)

            res.status(200).send({ message: "Post deletado." })

        } catch (error) {
            console.log(error);
            
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeDislike = async (req: Request, res: Response) =>{
        try {
            const input = likeDislikeSchema.parse({
                id: req.params.id,
                like: req.body.like,
                token: req.headers.authorization
            })
    
            await this.postBusiness.likeDislike(input)
    
            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
    }
}