import { UserController } from ".";
import { BadRequestException } from "@nestjs/common";
import "reflect-metadata";
import { UpdateUserResult } from "../services/user.service";
import { RequestUser } from "../decorators/user.decorator";

describe("UserController", () => {
  const updateUserResult = new UpdateUserResult(true);

  describe("updateProfile", () => {
    const userService: any = {};
    const controller = new UserController(userService);

    it("should have metadata", () => {
      // Act
      const meta = Reflect.getMetadataKeys(controller.updateProfile);

      // Assert
      expect(meta.some(x => x === "path")).toBe(true);
      expect(meta.some(x => x === "method")).toBe(true);
      expect(meta.some(x => x === "__httpCode__")).toBe(true);
    });

    describe("when service throws error", () => {
      it("should throw BadRequestException", async () => {
        // Act
        const result = controller.updateProfile(undefined, undefined);

        // Assert
        await expect(result).rejects.toBeInstanceOf(BadRequestException);
      });
    });

    describe("when service is successful", () => {
      it("should return result", async () => {
        // Arrange
        const user: RequestUser = { sub: "id" };
        Object.assign(userService, {
          updateProfile: async () => updateUserResult
        });

        // Act
        const result = controller.updateProfile(user, undefined);

        // Assert
        await expect(result).resolves.toBeDefined();
        await expect(result).resolves.toBeInstanceOf(UpdateUserResult);
      });
    });
  });

  describe("changePassword", () => {
    const userService: any = {};
    const controller = new UserController(userService);
    it("should have metadata", () => {
      // Act
      const meta = Reflect.getMetadataKeys(controller.changePassword);

      // Assert
      expect(meta.some(x => x === "path")).toBe(true);
      expect(meta.some(x => x === "method")).toBe(true);
      expect(meta.some(x => x === "__httpCode__")).toBe(true);
    });

    describe("when service throws error", () => {
      it("should throw BadRequestException", async () => {
        // Act
        const result = controller.changePassword(undefined, undefined);

        // Assert
        await expect(result).rejects.toBeInstanceOf(BadRequestException);
      });
    });

    describe("when service is successful", () => {
      it("should return result", async () => {
        // Arrange
        const user: RequestUser = { sub: "id" };
        Object.assign(userService, {
          changePassword: async () => updateUserResult
        });

        // Act
        const result = controller.changePassword(user, undefined);

        // Assert
        await expect(result).resolves.toBeDefined();
        await expect(result).resolves.toBeInstanceOf(UpdateUserResult);
      });
    });
  });
});
