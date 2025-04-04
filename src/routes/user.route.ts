import { Router } from "express"
import { UserService } from "../services/user.service"

export const UserRoute = Router()

UserRoute.post('/login', async (req, res) => {
    try {
        res.json(await UserService.login(req.body))
    } catch (e: any) {
        res.status(401).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})