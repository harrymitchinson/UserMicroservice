import { User } from "./user.schema";
import { hash, compare } from "bcrypt";

/**
 * Checks whether the user's password has changed and hashes it before saving.
 * @export
 * @param {*} this
 * @param {*} next
 * @returns
 */
export async function hashPassword(this: any, next: any) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  return next();
}

/**
 * Checks whether the model has been modified and sets the modified property.
 * @export
 * @param {*} this
 * @param {*} next
 * @returns
 */
export function updateModified(this: any, next: any) {
  if (this.isModified()) {
    this.modified = new Date();
  }
  return next();
}

/**
 * Checks whether the mdoel is new and sets the created property.
 * @export
 * @param {*} this
 * @param {*} next
 * @returns
 */
export function configureNewUser(this: any, next: any) {
  if (this.isNew) {
    this.created = new Date();
  }
  return next();
}

/**
 * Compares the provided password with the actual password.
 * @export
 * @param {*} this
 * @param {string} password
 * @returns {Promise<boolean>}
 */
export async function comparePassword(
  this: any,
  password: string
): Promise<boolean> {
  return await compare(password, this.password);
}
