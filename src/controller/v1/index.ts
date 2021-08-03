import express from "express";
import { routes as user } from "./user";
export default () => {
  const router = express.Router();
  router.use("/user", user());

  return router;
};
