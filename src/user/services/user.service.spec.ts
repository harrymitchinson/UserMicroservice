import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { validate } from "class-validator";
import { AuthService } from ".";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../../app.constants";
import { UserService } from "./user.service";
// TODO: Refactor these into describe when it should
// No types available so just require it like a typeless peasant.
const modelMock = require("mongoose-model-mock");

describe("UserService", () => {
  let userMock;
  let service: UserService;

  beforeEach(() => {
    userMock = modelMock.mock();
    service = new UserService(userMock);
  });

  describe("findByUserId", () => {
    describe("when user not found", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.findById.returns(undefined, undefined);

        // Act
        const result = service.findByUserId("1");

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when user found", () => {
      it("should return user", async () => {
        // Arrange
        userMock.findById.returns(undefined, { id: 1 });

        // Act
        const result = await service.findByUserId("1");

        // Assert
        expect(result).toBeDefined();
      });
    });
  });

  describe("create", () => {
    describe("when user exists", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.prototype.save.returns(new Error(), undefined);
        const user: any = { username: "test" };

        // Act
        const result = service.create(user);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when user does not exist", () => {
      it("should create user", async () => {
        // Arrange
        userMock.prototype.save.returns(undefined, { id: 1 });
        const user: any = { username: "test" };

        // Act
        const result = await service.create(user);

        // Assert
        expect(result).toBeDefined();
      });
    });
  });

  describe("verify", () => {
    describe("when user not found", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.find.returns(undefined, []);
        const user: any = { username: "test" };

        // Act
        const result = service.verify(user);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when user password is incorrect", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.find.returns(undefined, [{ comparePassword: () => false }]);
        const user: any = { username: "test" };

        // Act
        const result = service.verify(user);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when user password is correct", () => {
      it("should return user", async () => {
        // Arrange
        userMock.find.returns(undefined, [{ comparePassword: () => true }]);
        const user: any = { username: "test" };

        // Act
        const result = await service.verify(user);

        // Assert
        expect(result).toBeDefined();
      });
    });
  });

  describe("updateProfile", () => {
    describe("when user not found", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.findById.returns(undefined, undefined);
        const user: any = { username: "test" };

        // Act
        const result = service.updateProfile("1", user);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when no changes made", () => {
      it("should return false", async () => {
        // Arrange
        const user: any = {
          username: "test",
          firstName: "test",
          lastName: "test",
          isModified: () => false
        };
        userMock.findById.returns(undefined, user);

        // Act
        const result = await service.updateProfile("1", user);

        // Assert
        expect(result.updated).toBe(false);
      });
    });

    describe("when changes made", () => {
      it("should return true", async () => {
        // Arrange
        const user: any = {
          username: "test",
          firstName: "test",
          lastName: "test",
          isModified: () => true,
          save: () => undefined
        };
        userMock.findById.returns(undefined, user);

        // Act
        const result = await service.updateProfile("1", user);

        // Assert
        expect(result.updated).toBe(true);
      });
    });
  });

  describe("checkIfExists", () => {
    describe("when user not found", () => {
      it("should return false", async () => {
        // Arrange
        userMock.find.returns(undefined, []);
        const user: any = { username: "test" };

        // Act
        const result = await service.checkIfExists(user);

        // Assert
        expect(result.existing).toBe(false);
      });
    });

    describe("when user found", () => {
      it("should return true", async () => {
        // Arrange
        userMock.find.returns(undefined, [{ username: "test" }]);
        const user: any = { username: "test" };

        // Act
        const result = await service.checkIfExists(user);

        // Assert
        expect(result.existing).toBe(true);
      });
    });
  });

  describe("changePassword", () => {
    describe("when user not found", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.findById.returns(undefined, undefined);
        const user: any = { username: "test", password: "test" };

        // Act
        const result = service.changePassword("1", user);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when password is incorrect", () => {
      it("should throw error", async () => {
        // Arrange
        userMock.findById.returns(undefined, {
          comparePassword: async () => false
        });
        const user: any = { username: "test", password: "test" };

        // Act
        const result = service.changePassword("1", user);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });

    describe("when password changed", () => {
      it("should return true", async () => {
        // Arrange
        userMock.findById.returns(undefined, {
          comparePassword: async () => true,
          save: async () => undefined
        });
        const user: any = {
          username: "test",
          password: "test",
          newPassword: "test1"
        };

        // Act
        const result = await service.changePassword("1", user);

        // Assert
        expect(result.updated).toBe(true);
      });
    });
  });
});
