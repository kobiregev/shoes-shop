import express from "express";
import { createProductHandler } from "./product.controller";
import { processRequestBody } from "zod-express-middleware";
import { createProductSchema } from "./product.schema";
const router = express.Router();

router.post(
  "/",
  processRequestBody(createProductSchema.body),
  createProductHandler
);

export default router;
