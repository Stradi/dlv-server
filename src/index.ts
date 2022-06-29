import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.get("/heathcheck", (req: Request, res: Response) => {
  res.send("All good!").status(200);
});

app.listen(PORT, () => {
  console.log(
    `Server is running on 'http://127.0.0.1:${PORT}' (or 'http://localhost:${PORT}')`
  );
});
