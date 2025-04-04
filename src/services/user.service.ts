import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import type { LoginModel } from "../models/login.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const repo = AppDataSource.getRepository(User)
const tokenSecret = process.env.JWT_SECRET
const accessTTL = process.env.JWT_ACCESS_TTL
const refreshTTL = process.env.JWT_REFRESH_TTL

export class UserService {

    static async login(model: LoginModel) {
        const user = await this.getUserByEmail(model.email)

        if (await bcrypt.compare(model.password, user!.password)) {
            const payload = {
                id: user?.userId,
                email: user?.email
            }

            return {
                name: user?.email,
                access: jwt.sign(payload, tokenSecret, { expiresIn: accessTTL }),
                refresh: jwt.sign(payload, tokenSecret, { expiresIn: refreshTTL })
            }
        }

        throw new Error('BAD_CREDENTIALS')
    }

    static async getUserByEmail(email: string) {
        const data = repo.findOne({
            where: {
                email: email,
                deletedAt: IsNull()
            }
        })

        if (data == null)
            throw new Error("USER_NOT_FOUND")

        return data
    }
}