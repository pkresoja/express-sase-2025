import { Router } from "express";
import { TicketService } from "../services/ticket.service";
import { sendError } from "../utils";

export const TicketRoute = Router()

TicketRoute.get('/', async (req: any, res) => {
    try {
        res.json(await TicketService.getTickets(req.user.id))
    } catch (e) {
        sendError(res, e)
    }
})

TicketRoute.get('/:id', async (req: any, res) => {
    try {
        const id = Number(req.params.id)
        res.json(await TicketService.getTicketById(req.user.id, id))
    } catch (e) {
        sendError(res, e)
    }
})

TicketRoute.post('/', async (req: any, res) => {
    try {
        await TicketService.createTicket(req.user.id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

TicketRoute.put('/:id/pay', async (req: any, res) => {
    try {
        const id = Number(req.params.id)
        await TicketService.makeTicketPaid(req.user.id, id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

TicketRoute.put('/:id', async (req: any, res) => {
    try {
        const id = Number(req.params.id)
        await TicketService.updateTicket(req.user.id, id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

TicketRoute.delete('/:id', async (req: any, res) => {
    try {
        const id = Number(req.params.id)
        await TicketService.deleteTicket(req.user.id, id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})