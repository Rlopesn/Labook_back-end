import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDatabase'
import { IdGenerator } from '../service/IdGenerator'
import { TokenManager } from '../service/TokenManager'
import { HashManager } from '../service/HashManager'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post('/signup', userController.create)
userRouter.get('/', userController.getAllUsers)
userRouter.post('/login', userController.login)