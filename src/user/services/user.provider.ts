import { Connection } from "mongoose";
import * as mongoose from "mongoose";
import { UserSchema } from "./../schemas/user.schema";
import { USER_MODEL_TOKEN, DB_CONNECTION_TOKEN } from "./../../app.constants";

export const UserProvider = {
  provide: USER_MODEL_TOKEN,
  useFactory: (connection: Connection) => connection.model("User", UserSchema),
  inject: [DB_CONNECTION_TOKEN]
};
