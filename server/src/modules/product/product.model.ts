import { getModelForClass, prop } from "@typegoose/typegoose";

export enum Sizes {
  eu38 = "38",
  eu39 = "39",
  eu40 = "40",
  eu41 = "41",
  eu42 = "42",
  eu43 = "43",
  eu44 = "44",
}
// might add not available boolean prop
export class Product {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, type: String})
  imagesUrl: string[];

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  description: string;

  @prop({ required: false, type: String, enum: Sizes, default: [] })
  sizes?: Sizes[];
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
