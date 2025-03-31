import { Router } from "express";
import { FlightService } from "./flight.service";

export const FlightRoute = Router()

FlightRoute.get('/', async (req, res) => {
    const rsp = await FlightService.getFlights()
    res.json(rsp.data)
})

FlightRoute.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const rsp = await FlightService.getFlightById(id)
    res.json(rsp.data)
})