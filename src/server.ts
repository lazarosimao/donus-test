import { app } from "./app";
import Logger from "./usefulness/Logger";
import "reflect-metadata";
import './utils/module-alias';
import createConnection from '@src/database';

createConnection()
  .then(async () => {
    app.listen(3333, () => {
      Logger.info("🚀️ http://localhost:3333/api/v1 up");
    });
  })
  .catch((error) => console.log(error));