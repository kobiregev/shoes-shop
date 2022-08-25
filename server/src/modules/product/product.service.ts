import { Product, ProductModel } from "./product.model";

export async function createProduct(product: Product) {
  return ProductModel.create(product);
}
