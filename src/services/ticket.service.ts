import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Ticket } from "../entities/Ticket";
import { FlightService } from "./flight.service";
import { AirlineService } from "./airline.service";

const repo = AppDataSource.getRepository(Ticket)

export class TicketService {
    static async getTickets(id: number) {
        const data = await repo.find({
            select: {
                ticketId: true,
                flightId: true,
                airlineId: true,
                airline: {
                    airlineId: true,
                    name: true
                },
                paidAt: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                userId: id,
                deletedAt: IsNull()
            },
            relations: {
                airline: true
            },
            order: {
                createdAt: 'desc',
                paidAt: 'asc'
            }
        })

        const ids = data.map(t => t.flightId)
        const flights = await FlightService.getFlightsByIds(ids)

        for (let ticket of data) {
            ticket.flight = flights.data.find((f: any) => f.id == ticket.flightId)
        }

        return data
    }

    static async getTicketById(user: number, id: number, includeFlightObject = false) {
        const data = await repo.findOne({
            where: {
                ticketId: id,
                userId: user,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error("TICKET_NOT_FOUND")

        if (includeFlightObject) {
            const rsp = await FlightService.getFlightById(data.flightId)
            data.flight = rsp.data
            data.airline = await AirlineService.getAirlineById(data.airlineId)
        }

        return data
    }

    static async createTicket(user: number, model: Ticket) {
        await repo.save({
            userId: user,
            airlineId: model.airlineId,
            flightId: model.flightId,
            createdAt: new Date()
        })
    }

    static async updateTicket(user: number, id: number, model: Ticket) {
        const ticket = await this.getTicketById(user, id)

        if (ticket.paidAt != null)
            throw new Error('TICKET_ALREADY_PAID')

        ticket.flightId = model.flightId
        ticket.airlineId = model.airlineId
        ticket.updatedAt = new Date()
        await repo.save(ticket)
    }

    static async makeTicketPaid(user: number, id: number) {
        const ticket = await this.getTicketById(user, id)

        if (ticket.paidAt != null)
            throw new Error('TICKET_ALREADY_PAID')

        ticket.paidAt = new Date()
        await repo.save(ticket)
    }

    static async deleteTicket(user: number, id: number) {
        const ticket = await this.getTicketById(user, id)
        ticket.deletedAt = new Date()
        await repo.save(ticket)
    }
}