import { Test } from "@nestjs/testing";
import { AppModule } from "./app.module";

describe("AppModule", () => {
  describe("when instantiated", () => {
    it("should be defined", () => {
      // Act
      const module = new AppModule();

      // Assert
      expect(module).toBeDefined();
    });
  });
});
