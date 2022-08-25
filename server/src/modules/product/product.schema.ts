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

export type CreateProductBody = TypeOf<typeof createProductSchema.body>;
