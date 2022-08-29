import { object, string, TypeOf } from "zod";

export const createCategorySchema = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
  }),
};

export const addProductToCategorySchema = {
  body: object({
    id: string({
      required_error: "id is required",
    }),
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export type CreateCategorySchemaBody = TypeOf<typeof createCategorySchema.body>;
export type AddProductToCategoryBody = TypeOf<
  typeof addProductToCategorySchema.body
>;
