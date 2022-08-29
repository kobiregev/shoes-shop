import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";

export class Cart {
  @prop({ required: true, unique: true, ref: () => User })
  user: Ref<User>;

  @prop({ required: false, default: [], ref: () => Product })
  products?: Ref<Product>[];
}

export const CartModel = getModelForClass(Cart, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
