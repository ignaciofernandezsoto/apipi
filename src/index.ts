import express, { Express } from 'express';
import dotenv from 'dotenv';
import {GithubWebhookRoute} from "./route/github-webhook.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

//app.use(express.json())

app.use('/github-webhook', GithubWebhookRoute.router);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});