import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Airline } from "./entities/Airline";
import { Ticket } from "./entities/Ticket";
import { User } from "./entities/User";

configDotenv()
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Airline, Ticket, User
    ],
    logging: false
})