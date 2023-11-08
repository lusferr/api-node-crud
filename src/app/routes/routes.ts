import { Router } from "express";
import studentRouter from "../controllers/StudentController";

const routers = Router()

routers.use('/', studentRouter);

export default routers;
