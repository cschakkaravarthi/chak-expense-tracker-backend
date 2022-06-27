import express, { Application } from "express";

import config from "./config";
import { databaseConnection } from "./database";
import expressApp from "./express-app";

const StartServer = async (): Promise<any> => {
  const app: Application = express();

  await databaseConnection();

  await expressApp(app);

  app
    .listen(config.PORT, () => {
      console.log(`listening to port ${config.PORT}`);
    })
    .on("error", (err: any) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
