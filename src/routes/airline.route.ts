import { Router } from "express";
import { AirlineService } from "../services/airline.service";
import { sendError } from "../utils";

export const AirlineRoute = Router()

AirlineRoute.get('/', async (req, res) => {
    try {
        res.json(await AirlineService.getAirlines())
    } catch (e) {
        sendError(res, e)
    }
})

AirlineRoute.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        res.json(await AirlineService.getAirlineById(id))
    } catch (e) {
        sendError(res, e)
    }
})

AirlineRoute.post('/', async (req, res) => {
    try {
        await AirlineService.createAirline(req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

AirlineRoute.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await AirlineService.updateAirline(id, req.body)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})

AirlineRoute.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await AirlineService.deleteAirline(id)
        res.status(204).send()
    } catch (e) {
        sendError(res, e)
    }
})