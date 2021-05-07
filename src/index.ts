import config from "./config";
import app from "./config/server";

process.env.NODE_ENV = config.app.env;
const port = config.api.port || 3000;

app().serverListen(port);
