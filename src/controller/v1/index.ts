import express from "express";
import { routes as user } from "./user";
import { routes as wallet } from "./wallet";

export default () => {
  const router = express.Router();
  router.use("/user", user());
  router.use("/wallet", wallet());

  return router;
};
