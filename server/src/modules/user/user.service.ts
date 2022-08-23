import { User, UserModel } from "./user.model";

export async function createUser(
  user: Omit<User, "comparePassword" | "role">
) {
  return UserModel.create(user);
}

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}
