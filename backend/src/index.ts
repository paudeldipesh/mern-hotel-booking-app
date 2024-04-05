import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello from express endpoint",
  });
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
