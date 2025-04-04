import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import type { LoginModel } from "../models/login.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Response } from "express";

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

    static async verifyToken(req: any, res: Response, next: Function) {
        const whitelist = ['/api/user/login']

        if (whitelist.includes(req.path)) {
            next()
            return
        }

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == undefined) {
            res.status(401).json({
                message: 'NO_TOKEN_FOUND',
                timestamp: new Date()
            })
            return
        }

        jwt.verify(token, tokenSecret, (err:any, user: any) =>{
            if (err) {
                res.status(403).json({
                    message: 'INVALID_TOKEN',
                    timestamp: new Date()
                })
                return
            }

            req.user = user
            next()
        })
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