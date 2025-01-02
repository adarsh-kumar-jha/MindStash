export const JWT_PASSWORD = "Secret";
// export const DB_URL ="mongodb+srv://jhaadarsh234:mlM1GwBykUojesB8@celebralsync.jq1fj.mongodb.net/MindStash"

import dotenv from "dotenv";
dotenv.config();

console.log("DB_URL from .env:", process.env.DB_URL);


export const DB_URL = process.env.DB_URL!;