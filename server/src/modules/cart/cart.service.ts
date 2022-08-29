import { CartModel } from "./cart.model";

export async function findCartByUserId(id: string) {
  return CartModel.findOne({ user: id });
}

export async function createCart(id: string) {
  return CartModel.create({ user: id });
}
