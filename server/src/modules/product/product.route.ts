import express from "express";
import {
  createProductHandler,
  updateProductHandler,
} from "./product.controller";
import { processRequestBody } from "zod-express-middleware";
import { createProductSchema, updateProductSchema } from "./product.schema";
const router = express.Router();

router.post(
  "/",
  processRequestBody(createProductSchema.body),
  createProductHandler
);

router.put(
  "/",
  processRequestBody(updateProductSchema.body),
  updateProductHandler
);

export default router;
