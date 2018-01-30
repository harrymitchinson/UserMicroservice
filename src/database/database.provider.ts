import { Mockgoose } from "mockgoose-fix";
import * as mongoose from "mongoose";
import { CONNECTION_STRING, DB_CONNECTION_TOKEN } from "../app.constants";
import { Mongoose } from "mongoose";

// Overwrite the default mongoose promise with global promise.
(<any>mongoose).Promise = global.Promise;

/**
 * Provides a mongoose instance after connecting to the database.
 * @returns
 */
const databaseFactory = async () => {
  if (process.env.NODE_ENV !== "test") {
    await mongoose.connect(CONNECTION_STRING);
  } else {
    const mockgoose = new Mockgoose(mongoose);
    mockgoose.helper.setDbVersion("3.4.3");
    await mockgoose.prepareStorage();
    await mongoose.connect("mongodb://test.com/TestingDB");
  }
  return mongoose;
};

// The database provider service.
export const DatabaseProvider = {
  provide: DB_CONNECTION_TOKEN,
  useFactory: databaseFactory
};
