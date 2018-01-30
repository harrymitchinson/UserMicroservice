import { Schema, Document, Model, SchemaDefinition } from "mongoose";
import { hash, compare } from "bcrypt";
import {
  hashPassword,
  updateModified,
  configureNewUser,
  comparePassword
} from "./user.schema.helpers";

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

const definition: SchemaDefinition = {
  username: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String },
  firstName: String,
  lastName: String,
  created: Date,
  modified: Date
};

export const UserSchema = new Schema(definition)
  .pre("save", hashPassword)
  .pre("save", updateModified)
  .pre("save", configureNewUser)
  .method("comparePassword", comparePassword);
