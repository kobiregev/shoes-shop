import { CategoryModel } from "./category.model";

export async function createCategory(name: string) {
  return CategoryModel.create({ name });
}

export async function addProductToCategory(id: string, productId: string) {
  return CategoryModel.findByIdAndUpdate(
    id,
    {
      $addToSet: { products: productId },
    },
    { new: true }
  );
}
