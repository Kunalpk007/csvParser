import { createExpressServer, useContainer } from "routing-controllers";
import 'reflect-metadata';
// import app from "./app";
import dotenv from "./config/dotenv";
import { Container } from 'typedi';
import { UserController } from "./controller/userController";
import database from "./config/database";
import express, { Application } from "express";

const PORT = dotenv.PORT || 3000;
useContainer(Container);

// const app: Application = express();

// app.use(express.json());
const controllers = [UserController];
// app.use("/", userRoutes);



database.initialize().then(() => {

    console.log("Database connected");
}).catch((err: any) => {
    console.log("Database connection failed", err);
    console.log(err);
}   );

const app = createExpressServer({
    controllers: controllers, // Pass the controllers to the server
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});