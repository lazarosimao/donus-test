import { app } from "./app";
import { createConnections } from "typeorm";
import "reflect-metadata";
import './../utils/module-alias';

createConnections()
  .then(async () => {
    app.listen(3333, () => {
      console.log(`🚀️ http://localhost:3333/api/v1 up`);
    });
  })
  .catch((error) => console.log(error));