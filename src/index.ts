import express, { Request, Response } from "express";

const app = express();
const port = 3005;

app.get("/", (req: Request, res: Response) => {
  debugger;
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
