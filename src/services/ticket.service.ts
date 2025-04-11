import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Ticket } from "../entities/Ticket";
import { FlightService } from "./flight.service";

const repo = AppDataSource.getRepository(Ticket)

export class TicketService {
    static async getTickets() {
        const data = await repo.find({
            where: {
                userId: 1,
                deletedAt: IsNull()
            }
        })

        // for (let ticket of data) {
        //     const f = await FlightService.getFlightById(ticket.flightId)
        //     ticket.flight = f.data
        // }
        const ids = data.map(t => t.flightId)
        const flights = await FlightService.getFlightsByIds(ids)

        for (let ticket of data) {
            ticket.flight = flights.data.find((f: any) => f.id == ticket.flightId)
        }

        return data
    }
}