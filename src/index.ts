import config from "./config";
import app from "./config/server";
import { createConnection } from "typeorm";

process.env.NODE_ENV = config.app.env;
const port = config.api.port || 3000;

createConnection().then(async (conn) => {
  await conn.runMigrations();
  app().serverListen(port);
});
