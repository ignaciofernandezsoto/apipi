import dotenv from "dotenv";

dotenv.config();

const config = {
    url: process.env.JENKINS_URL!
}

export const JenkinsConfig = {
    config
}