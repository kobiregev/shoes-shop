import { infer, z, number, object, string, TypeOf } from "zod";
import { Sizes } from "./product.model";

export const createProductSchema = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    imagesUrl: string().array(),
    price: number({
      required_error: "price is required",
    }),
    description: string({
      required_error: "description is required",
    }),
    sizes: z.nativeEnum(Sizes).array(),
  }),
};

export const updateProductSchema = {
  body: object({
    id: string({
      required_error: "id is required",
    }),
    name: string().optional(),
    imagesUrl: string().array().optional(),
    price: number().optional(),
    description: string().optional(),
    sizes: z.nativeEnum(Sizes).array().optional(),
  }),
};

export type UpdateProductBody = TypeOf<typeof updateProductSchema.body>;
export type CreateProductBody = TypeOf<typeof createProductSchema.body>;
