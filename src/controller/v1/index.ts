import express from "express";
import { routes as user } from "./user";
import { routes as wallet } from "./wallet";
import { routes as platform } from "./platform";
import { routes as currency } from "./currency";
import { routes as event } from "./event";
import { routes as chart } from "./chart";

export default () => {
  const router = express.Router();
  router.use("/user", user());
  router.use("/wallet", wallet());
  router.use("/platform", platform());
  router.use("/currency", currency());
  router.use("/event", event());
  router.use('/chart',chart())
  return router;
};
