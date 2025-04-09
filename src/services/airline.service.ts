import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Airline } from "../entities/Airline";

const repo = AppDataSource.getRepository(Airline)

export class AirlineService {
    static async getAirlines() {
        return await repo.find({
            select: {
                airlineId: true,
                name: true,
                website: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getAirlineById(id: number) {
        const data = await repo.findOne({
            where: {
                airlineId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('NOT_FOUND')

        return data
    } 
}