import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findProductById } from "../product/product.service";
import {
  AddProductToCategoryBody,
  CreateCategorySchemaBody,
} from "./category.schema";
import { addProductToCategory, createCategory } from "./category.service";

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategorySchemaBody>,
  res: Response
) {
  try {
    const { name } = req.body;
    const createdCategory = await createCategory(name);
    return res.status(StatusCodes.CREATED).send(createdCategory);
  } catch (e: any) {
    if (e.code === 11000) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Category already exists");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function removeProductToCategoryHandler(
  req: Request<{}, {}, AddProductToCategoryBody>,
  res: Response
) {
  const { id, productId } = req.body;
  try {
    // check if product with id exists
    const product = await findProductById(productId);
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(`Could not find product with id ${productId}`);
    }
    // add product id to category
    await addProductToCategory(id, productId);
    return res.sendStatus(StatusCodes.OK);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
export async function addProductToCategoryHandler(
  req: Request<{}, {}, AddProductToCategoryBody>,
  res: Response
) {
  const { id, productId } = req.body;
  try {
    // check if product with id exists
    const product = await findProductById(productId);
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(`Could not find product with id ${productId}`);
    }
    // add product id to category
    await addProductToCategory(id, productId);
    return res.sendStatus(StatusCodes.OK);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
