import { Router } from "express";
import { TicketService } from "../services/ticket.service";
import { sendError } from "../utils";

export const TicketRoute = Router()

TicketRoute.get('/', async (req, res) => {
    try {
        res.json(await TicketService.getTickets())
    } catch (e) {
        console.log(e)
        sendError(res, e)
    }
})