import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as http from "http";
import logger from "./logger";

export default () => {
  const app = express();
  const httpServer = http.createServer(app);
  const apiRouter = express.Router();

  const urlencodedParser = bodyParser.urlencoded({
    extended: true,
  });

  apiRouter.use(cookieParser());
  apiRouter.use(urlencodedParser);
  apiRouter.use(bodyParser.json());
  apiRouter.use(bodyParser.text());
  apiRouter.use(cors("*"));

  app.use("/api", apiRouter);

  if (process.env.NODE_ENV === "development")
    apiRouter.use((req, res, next) => {
      console.log(req.method, req.originalUrl);
      next();
    });

  return {
    serverListen(port) {
      httpServer.listen(port);
      logger.info(`Server listening on port ${port}`);
      console.log(`Server listening on port ${port}`);
    },
  };
};
