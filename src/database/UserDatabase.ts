import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUserById(id: string): Promise<UserDB|undefined> {
        const [result] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({ id })
        if (!result) {
            return undefined
        }
        const user: UserDB = {
            id: result.id,
            name: result.name,
            email: result.email,
            password: result.password,
            role: result.role,
            created_at: result.created_at
        }
        return user
    }

    public async findUserByEmail(email: string): Promise<UserDB>{
        const [result] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email})
        return result as UserDB
    }

    public async creatUser(newUserDB: UserDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB)
    }

    public async findUser(): Promise<UserDB[]>{
       const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
       return result
    }
}