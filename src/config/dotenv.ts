import dotenv from "dotenv";
dotenv.config();

export default {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_USERNAME: process.env.DB_USERNAME || 'admin',
    DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
    DB_DATABASE: process.env.DB_DATABASE || 'postgresdb',
    PORT: process.env.APPPORT,
}