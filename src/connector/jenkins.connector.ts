import {Request} from "express";
import {JenkinsConfig} from "../config/jenkins.config";
import fetch from "node-fetch";
import Response from "node-fetch"

const GITHUB_WEBHOOK_RESOURCE = "github-webhook"

const jenkinsConfig = JenkinsConfig.config;

const sendGithubWebhook: (req: Request) => Promise<void | Response> = (req) =>
    // @ts-ignore
    fetch(
        `${jenkinsConfig.url}/${GITHUB_WEBHOOK_RESOURCE}/`,
        {
            body: req.body,
            headers: req.headers as any,
            method: "POST",
        }
    ).catch((e: any) => console.log(e));

export const JenkinsConnector = {
    sendGithubWebhook
}