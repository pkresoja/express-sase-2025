import { Router } from "express";
import { FlightService } from "../services/flight.service";
import { sendError } from "../utils";

export const FlightRoute = Router()

FlightRoute.get('/', async (req, res) => {
    try {
        const rsp = await FlightService.getFlights()
        res.json(rsp.data)
    } catch (e) {
        sendError(res, e)
    }
})

FlightRoute.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const rsp = await FlightService.getFlightById(id)
        res.json(rsp.data)
    } catch (e) {
        sendError(res, e)
    }
})