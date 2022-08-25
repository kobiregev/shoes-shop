import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateProductBody } from "./product.schema";
import { createProduct } from "./product.service";

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
