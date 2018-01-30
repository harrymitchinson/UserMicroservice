import { Test } from "@nestjs/testing";
import { UserModule } from "./user.module";

describe("UserModule", () => {
  describe("when instantiated", () => {
    it("should be defined", () => {
      // Act
      const module = new UserModule();

      // Assert
      expect(module).toBeDefined();
    });
  });

  describe("when configured", () => {
    it("should have middleware", () => {
      // Arrange
      const mockConsumer: any = {
        apply: () => mockConsumer,
        forRoutes: () => mockConsumer
      };

      // Act
      const module = () => new UserModule().configure(mockConsumer);

      // Assert
      expect(() => module()).not.toThrow();
    });
  });
});
