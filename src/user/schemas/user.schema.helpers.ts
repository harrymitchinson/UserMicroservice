import { User } from "./user.schema";
import { hash, compare } from "bcrypt";

export async function hashPassword(this: any, next: any) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  return next();
}

export function updateModified(this: any, next: any) {
  if (this.isModified()) {
    this.modified = new Date();
  }
  return next();
}

export function configureNewUser(this: any, next: any) {
  if (this.isNew) {
    this.created = new Date();
  }
  return next();
}

export async function comparePassword(
  this: any,
  password: string
): Promise<boolean> {
  return await compare(password, this.password);
}
