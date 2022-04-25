import express, {Request, Response} from "express";
import {JenkinsProxyService} from "../service/jenkins-proxy.service";

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const proxiedResponse = await JenkinsProxyService.proxyGithubWebhook(req);
    res.send(proxiedResponse);
});

export const GithubWebhookRoute = {
    router
}