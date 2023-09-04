import express from 'express'
import { PostController } from '../controller/PostController'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
import { IdGenerator } from '../service/IdGenerator'
import { TokenManager } from '../service/TokenManager'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
        )
)

postRouter.post('/', postController.create)
postRouter.get('/', postController.getAll)
postRouter.put('/:id', postController.update)
postRouter.delete('/:id', postController.delete)
postRouter.put('/:id/like', postController.likeDislike)