import { Mockgoose } from "mockgoose-fix";
import * as mongoose from "mongoose";
import { CONNECTION_STRING, DB_CONNECTION_TOKEN } from "../app.constants";
import { Mongoose } from "mongoose";

(<any>mongoose).Promise = global.Promise;

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

export const DatabaseProvider = {
  provide: DB_CONNECTION_TOKEN,
  useFactory: databaseFactory
};
