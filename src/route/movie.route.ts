import express, {Request, Response, Router} from "express";
import {MovieService} from "../service/movie/movie.service";

export class MovieRoute {
    constructor(private readonly moviesService: MovieService) {}

    getRouter(): Router {
        const router = express.Router()

        router.get('/', async (req: Request, res: Response) => {
            const response = await this.moviesService.getMovies(
                req.query.q as string,
                parseInt(req.query.limit as string),
                parseInt(req.query.page as string),
            );
            res.send(response);
        });

        router.get('/:yifyId', async (req: Request, res: Response) => {
            const response = await this.moviesService.getMovie(
                parseInt(req.params.yifyId),
            );
            res.send(response);
        });

        return router
    }

}