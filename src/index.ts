import express from "express";
import cors from 'cors';
import { userRouter } from "./router/userRouter";
import { postRouter } from "./router/postRouter";
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json());
app.use(cors())

app.listen(Number(process.env.PORT ||3003), () => {
    console.log("servidor rodando na porta 3003")
})

app.use('/users', userRouter)
app.use('/posts', postRouter)