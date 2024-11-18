
import express, { Application } from "express";
import cors from "cors";
import mainRoutes from "./routes/routes";
import { serverConfig } from "./config/serverConfig";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/posts", express.static(serverConfig.uploadDirectory));

app.use(mainRoutes);

export default app;