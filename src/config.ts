export const JWT_PASSWORD = "Secret";


import dotenv from "dotenv";
dotenv.config();

console.log("DB_URL from .env:", process.env.DB_URL);


export const DB_URL = process.env.DB_URL!;
