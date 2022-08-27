import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateProductBody, UpdateProductBody } from "./product.schema";
import {
  createProduct,
  findProductById,
  updateProductById,
} from "./product.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductBody>,
  res: Response
) {
  const product = req.body;
  try {
    const createdProduct = await createProduct(product);
    return res.status(StatusCodes.CREATED).send({ product: createdProduct });
  } catch (e: any) {
    if (e.code === 11000)
      return res.status(StatusCodes.CONFLICT).send("Product already exists");

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

// todo: refactor, might be able to do only one call to database, need to check.
export async function updateProductHandler(
  req: Request<{}, {}, UpdateProductBody>,
  res: Response
) {
  const { id, ...restProduct } = req.body;
  try {
    const updatedProduct = await updateProductById(id, restProduct);

    if (updatedProduct == null) {
      return res.status(StatusCodes.BAD_REQUEST).send("Couldn't find product");
    }

    return res.status(StatusCodes.OK).send(updatedProduct);
  } catch (e: any) {
    if (e.code === 11000) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(
          `Product with name "${Object.values(e?.keyValue)[0]}" already exists`
        );
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
