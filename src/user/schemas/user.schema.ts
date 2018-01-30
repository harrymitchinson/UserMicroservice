import { Schema, Document, Model, SchemaDefinition } from "mongoose";
import { hash, compare } from "bcrypt";
import {
  hashPassword,
  updateModified,
  configureNewUser,
  comparePassword
} from "./user.schema.helpers";

/**
 * The mongoose user document.
 * @export
 * @interface User
 * @extends {Document}
 */
export interface User extends Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  created: Date;
  modified: Date;
  lastActive: Date;
  comparePassword(password: string): Promise<boolean>;
}

// The mongoose user schema definition.
const definition: SchemaDefinition = {
  username: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String },
  firstName: String,
  lastName: String,
  created: Date,
  modified: Date
};

// Create the user schema using the user schema definition and add hooks and methods.
export const UserSchema = new Schema(definition)
  .pre("save", hashPassword)
  .pre("save", updateModified)
  .pre("save", configureNewUser)
  .method("comparePassword", comparePassword);
