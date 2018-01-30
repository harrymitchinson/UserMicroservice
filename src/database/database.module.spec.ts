import { Test } from "@nestjs/testing";
import { DatabaseModule } from "./database.module";

describe("DatabaseModule", () => {
  describe("when instantiated", () => {
    it("should be defined", () => {
      // Act
      const module = new DatabaseModule();

      // Assert
      expect(module).toBeDefined();
    });
  });
});
