import * as dotenv from "dotenv";
import api from "./api";
import app from "./app";
import database from "./database";
const env = dotenv.config().parsed;
export default {
    database: database(env),
    api: api(env),
    app: app(env),
};
//# sourceMappingURL=index.js.map