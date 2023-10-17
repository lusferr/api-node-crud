import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateStudentsTable1697229259279 } from "./migrations/1697229259279-createStudentsTable"
import Student from "../app/entities/Student"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "example",
    database: "gen_crud",
    synchronize: true,
    logging: false,
    entities: [Student],
    migrations: [CreateStudentsTable1697229259279],
    subscribers: [],
})
