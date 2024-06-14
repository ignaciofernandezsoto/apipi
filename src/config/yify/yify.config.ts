import dotenv from "dotenv";

dotenv.config();

const config = {
    baseUrl: process.env.YIFY_BASE_URL!
}

export const YifyConfig = {
    config
}