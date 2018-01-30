import { DatabaseProvider } from "./database.provider";
import * as mongoose from "mongoose";

describe("DatabaseProvider", () => {
  let database: mongoose.Mongoose;
  let connectSpy: any;
  let provider: any;

  afterEach(async () => {
    process.env.NODE_ENV = "test";
    await database.disconnect();
  });

  describe("when test environment", () => {
    beforeEach(async () => {
      // Arrange
      provider = DatabaseProvider;
      connectSpy = jest.spyOn(mongoose, "connect");

      // Act
      database = await provider.useFactory();
    });
    it("should call connect", async () => {
      // Assert
      expect(connectSpy).toBeCalled();
    });
    it("should provide in-memory database", async () => {
      // Assert
      expect(database).toBeDefined();
    });
  });

  describe("when not test environment", () => {
    beforeEach(async () => {
      // Arrange
      process.env.NODE_ENV = "local";
      provider = DatabaseProvider;
      connectSpy = jest.spyOn(mongoose, "connect");

      // Act
      database = await provider.useFactory();
    });
    it("should call connect", async () => {
      // Assert
      expect(connectSpy).toBeCalled();
    });
    it("should provide database", async () => {
      // Assert
      expect(database).toBeDefined();
    });
  });
});
