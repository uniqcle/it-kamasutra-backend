import { app } from "./app";
import { runDb } from "./db/mongodb";

const port = 3005;

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp(); 

