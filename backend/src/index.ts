import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 8848;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from express endpoint!" });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
