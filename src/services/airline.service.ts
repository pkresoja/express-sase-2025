import { AppDataSource } from "../db";
import { Airline } from "../entities/Airline";

const repo = AppDataSource.getRepository(Airline)

export class AirlineService {
    static async getAirlines() {
        return await repo.find({
            select: {
                airlineId: true,
                name: true,
                website: true
            },
            where: {
                active: true
            }
        })
    }
}