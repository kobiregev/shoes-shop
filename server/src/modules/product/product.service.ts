import { Product, ProductModel } from "./product.model";

export async function createProduct(product: Product) {
  return ProductModel.create(product);
}

export async function findProductById(id: string) {
  return ProductModel.findById(id);
}

export async function updateProductById(id: string, product: Partial<Product>) {
  return ProductModel.findByIdAndUpdate(id, product, { new: true });
}

export async function getProducts() {
  return ProductModel.find();
}
