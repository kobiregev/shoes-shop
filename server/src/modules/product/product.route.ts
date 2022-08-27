import express from "express";
import {
  createProductHandler,
  getAllProductsHandler,
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

router.get("/", getAllProductsHandler);

export default router;
