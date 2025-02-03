import * as dotenv from "./dotenv";
import { DataSource } from "typeorm";   
import {User} from "../models/User";



const database: DataSource = new DataSource({

    type: "postgres",
    host: dotenv.default.DB_HOST,
    port: Number(dotenv.default.DB_PORT),
    username: dotenv.default.DB_USERNAME,
    password: dotenv.default.DB_PASSWORD,
    database: dotenv.default.DB_DATABASE,
    entities: [User]  ,
    synchronize: true,
    logging: false,
});

export default database;
