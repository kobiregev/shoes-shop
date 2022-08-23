import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import argon2 from "argon2";

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await argon2.hash(this.password);

    this.password = hash;

    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  password: string;

  @prop({ default: ROLES.USER })
  role: ROLES;

  async comparePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
