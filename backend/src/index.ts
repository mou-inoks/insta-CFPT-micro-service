
import express, { Application } from "express";
import cors from "cors";
import mainRoutes from "./routes/routes";
import { serverConfig } from "./config/serverConfig";
const promBundle = require('express-prom-bundle');
const promClient = require('prom-client');


const app: Application = express();

const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    customLabels: {project_name: 'hello_world', project_type: 'test_metrics_labels'},
    promClient: {
        collectDefaultMetrics: {
        }
      }
});


app.use(cors());
app.use(express.json());
app.use(metricsMiddleware)

app.use("/posts", express.static(serverConfig.uploadDirectory));
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.get('/leaks', async (req, res) => {
    let array = [];

    setInterval(() => {
        for (let i = 0; i < 1000000; i++) {
            array.push(new Array(25).fill('memory leak'));
        }
        console.log("added 300MB leak")
    }, 5000);
});


app.use(mainRoutes);

export default app;