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

    static async createAirline(model: Airline) {
        await repo.save({
            name: model.name,
            website: model.website,
            createdAt: new Date()
        })
    }
    
    static async updateAirline(id: number, model: Airline) {
        const data = await this.getAirlineById(id)
        data.name = model.name
        data.website = model.website
        data.updatedAt = new Date()
        await repo.save(data)
    }

    static async deleteAirline(id: number) {
        const data = await this.getAirlineById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}