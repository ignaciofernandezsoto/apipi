import {Request} from "express";
import {JenkinsConnector} from "../connector/jenkins.connector";
import Response from "node-fetch";

const proxyGithubWebhook: (req: Request) => Promise<void | Response> = (req) =>
    JenkinsConnector.sendGithubWebhook(req);

export const JenkinsProxyService = {
    proxyGithubWebhook
}