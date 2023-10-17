import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateStudentsTable1697229259279 } from "./migrations/1697229259279-createStudentsTable"
import Student from "../app/entities/Student"
import { config } from 'dotenv'

config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as number | undefined,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Student],
    migrations: [CreateStudentsTable1697229259279],
    subscribers: [],
})
