import * as mongoose from "mongoose";
import { UserProvider } from "./user.provider";

describe("UserProvider", () => {
  describe("when useFactory", () => {
    it("should provide user model", () => {
      // Arrange
      const provider = UserProvider;

      // Act
      const model = provider.useFactory(mongoose.connection);

      // Assert
      expect(model).toBeDefined();
    });
  });
});
