import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../product/product.model";

export class Category {
  @prop({ required: true, unique: true, lowercase: true })
  name: string;

  @prop({ required: false, default: [], ref: () => Product })
  products?: Ref<Product>[];
}

export const CategoryModel = getModelForClass(Category, {
  schemaOptions: {
    versionKey: false,
  },
});
