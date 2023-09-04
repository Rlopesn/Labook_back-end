import { UserDatabase } from "../database/UserDatabase"
import { userCreateInputDTO, userCreateOutputDTO } from "../dtos/userCreate.dto"
import { UserGetAllOutputDTO } from "../dtos/userGetAll.dto"
import { UserLoginInputDTO, UserLoginOutputDTO } from "../dtos/userLogin.dto"
import { ConflictError } from "../errors/ConflictError"
import { USER_ROLES, User } from "../models/User"
import { HashManager } from "../service/HashManager"
import { IdGenerator } from "../service/IdGenerator"
import { TokenManager, TokenPayload } from "../service/TokenManager"
import { UserDB } from "../types"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public create = async (input: userCreateInputDTO): Promise<userCreateOutputDTO> => {
        const { name, email, password } = input

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)       

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: USER_ROLES.NORMAL,
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.creatUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: userCreateOutputDTO = {
            message: "created",
            token: token
        }
        return output
    }

    public getAllUsers = async (): Promise<UserGetAllOutputDTO[]> => {
        const result = await this.userDatabase.findUser()

        const output: UserGetAllOutputDTO[] = result.map((user)=>({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createAt: user.created_at       
        }))

        return output
    }

    public login = async (input: UserLoginInputDTO): Promise<UserLoginOutputDTO> => {

        const { email, password } = input


        const user = await this.userDatabase.findUserByEmail(email)

        if (!user) {
            throw new ConflictError("User email not found.")
        }

        const isPasswordValid = await this.hashManager.compare(password, user.password)

        if (!isPasswordValid) {
            throw new ConflictError("incorrect password.")
        }

        const tokenPayload: TokenPayload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: UserLoginOutputDTO = {
            token: token
        }

        return output

    }
}