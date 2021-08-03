import { Router } from "express";

import * as controller from "../controller";

export default (router: Router) => {
  router.use("/v1", controller.v1());
};
