import express, { Express } from 'express';
import dotenv from 'dotenv';
import {MovieRoute} from "./route/movie.route";
import {MovieService} from "./service/movie/movie.service";
import {YifyConnector} from "./connector/yify/yify.connector";
import {YifyConfig} from "./config/yify/yify.config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const movieRoute = new MovieRoute(
    new MovieService(
        new YifyConnector(YifyConfig.config.baseUrl)
    )
)

app.use('/movies', movieRoute.getRouter())

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});