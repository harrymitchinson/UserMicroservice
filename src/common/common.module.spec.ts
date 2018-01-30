import { Test } from "@nestjs/testing";
import { CommonModule } from "./common.module";

describe("AppModule", () => {
  describe("when instantiated", () => {
    it("should be defined", () => {
      // Act
      const module = new CommonModule();

      // Assert
      expect(module).toBeDefined();
    });
  });

  describe("when configured", () => {
    it("should have middleware", () => {
      // Arrange
      const mockConsumer: any = {
        apply: () => mockConsumer,
        forRoutes: () => mockConsumer,
        with: () => mockConsumer
      };

      // Act
      const module = () => new CommonModule().configure(mockConsumer);

      // Assert
      expect(() => module()).not.toThrow();
    });
  });
});
