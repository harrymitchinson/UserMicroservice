import { AuthContoller } from ".";
import { BadRequestException } from "@nestjs/common";
import { AuthTokenResult } from "../services/auth.service";
import { ExistingUserResult } from "../services/user.service";

describe("AuthController", () => {
  const authTokenResult = new AuthTokenResult("token");
  const existingUserResult = new ExistingUserResult(true);

  describe("new", () => {
    const userService: any = {};
    const authService: any = {};
    const controller = new AuthContoller(userService, authService);

    it("should have metadata", () => {
      // Act
      const meta = Reflect.getMetadataKeys(controller.new);

      // Assert
      expect(meta.some(x => x === "path")).toBe(true);
      expect(meta.some(x => x === "method")).toBe(true);
      expect(meta.some(x => x === "__httpCode__")).toBe(true);
    });

    describe("when service throws error", () => {
      it("should throw BadRequestException", async () => {
        // Act
        const result = controller.new(undefined);

        // Assert
        await expect(result).rejects.toBeInstanceOf(BadRequestException);
      });
    });

    describe("when service is successful", () => {
      it("should return result", async () => {
        // Arrange
        Object.assign(userService, { create: async () => undefined });
        Object.assign(authService, { create: async () => authTokenResult });

        // Act
        const result = controller.new(undefined);

        // Assert
        await expect(result).resolves.toBeDefined();
        await expect(result).resolves.toBeInstanceOf(AuthTokenResult);
      });
    });
  });

  describe("authorize", () => {
    const userService: any = {};
    const authService: any = {};
    const controller = new AuthContoller(userService, authService);

    it("should have metadata", () => {
      // Act
      const meta = Reflect.getMetadataKeys(controller.authorize);

      // Assert
      expect(meta.some(x => x === "path")).toBe(true);
      expect(meta.some(x => x === "method")).toBe(true);
      expect(meta.some(x => x === "__httpCode__")).toBe(true);
    });

    describe("when service throws error", () => {
      it("should throw BadRequestException", async () => {
        // Act
        const result = controller.authorize(undefined);

        // Assert
        await expect(result).rejects.toBeInstanceOf(BadRequestException);
      });
    });

    describe("when service is successful", () => {
      it("should return result", async () => {
        // Arrange
        Object.assign(userService, { verify: async () => undefined });
        Object.assign(authService, { create: async () => authTokenResult });

        // Act
        const result = controller.authorize(undefined);

        // Assert
        await expect(result).resolves.toBeDefined();
        await expect(result).resolves.toBeInstanceOf(AuthTokenResult);
      });
    });
  });

  describe("checkIfExists", () => {
    const userService: any = {};
    const authService: any = {};
    const controller = new AuthContoller(userService, authService);

    it("should have metadata", () => {
      // Act
      const meta = Reflect.getMetadataKeys(controller.checkIfExists);

      // Assert
      expect(meta.some(x => x === "path")).toBe(true);
      expect(meta.some(x => x === "method")).toBe(true);
      expect(meta.some(x => x === "__httpCode__")).toBe(true);
    });

    describe("when service throws error", () => {
      it("should throw BadRequestException", async () => {
        // Act
        const result = controller.checkIfExists(undefined);

        // Assert
        await expect(result).rejects.toBeInstanceOf(BadRequestException);
      });
    });

    describe("when service is successful", () => {
      it("should return result", async () => {
        // Arrange
        Object.assign(userService, {
          checkIfExists: async () => existingUserResult
        });

        // Act
        const result = controller.checkIfExists(undefined);

        // Assert
        await expect(result).resolves.toBeDefined();
        await expect(result).resolves.toBeInstanceOf(ExistingUserResult);
      });
    });
  });
});
