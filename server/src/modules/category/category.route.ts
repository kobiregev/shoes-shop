import express from "express";
import { processRequestBody } from "zod-express-middleware";
import {
  addProductToCategoryHandler,
  createCategoryHandler,
} from "./category.controller";
import {
  addProductToCategorySchema,
  createCategorySchema,
} from "./category.schema";

const router = express.Router();

router.post(
  "/",
  processRequestBody(createCategorySchema.body),
  createCategoryHandler
);
router.put(
  "/addProductToCategory",
  processRequestBody(addProductToCategorySchema.body),
  addProductToCategoryHandler
);
export default router;
