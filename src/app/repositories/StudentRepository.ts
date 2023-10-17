import Student from "../entities/Student";
import { AppDataSource } from "../../database/data-source";

export const studentRepository = AppDataSource.getRepository(Student);