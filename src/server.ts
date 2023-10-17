import "reflect-metadata";
import express from "express";
import cors from 'cors';
import { AppDataSource } from "./database/data-source";
import routers from "./app/routes/routes";
import swaggerUi from "swagger-ui-express";
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css"

const swaggerDocument = require('../swagger.json');

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3333

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }));

app.use(routers);

AppDataSource.initialize().then(async () => {
    console.log("Database connect success!")
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}).catch((error) => {
    console.log("Algo deu errado")
    console.log(error)
})
