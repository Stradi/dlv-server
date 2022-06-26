import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(
    `Server is running on 'http://127.0.0.1:${PORT}' (or 'http://localhost:${PORT}')`
  );
});
