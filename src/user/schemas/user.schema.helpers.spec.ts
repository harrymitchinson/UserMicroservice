import { User, UserSchema } from "./user.schema";
import {
  hashPassword,
  updateModified,
  configureNewUser,
  comparePassword
} from "./user.schema.helpers";
import { Mockgoose } from "mockgoose-fix";
import * as mongoose from "mongoose";
import { hash } from "bcrypt";

describe("UserSchemaHelpers", () => {
  describe("hashPassword", () => {
    describe("when password not modified", () => {
      it("should ignore", async () => {
        // Arrange
        const password = "test";
        const user = {
          isModified: () => false,
          hashPassword: hashPassword,
          password: password
        };

        // Act
        await user.hashPassword(jest.fn);

        // Assert
        expect(user.password).toBe(password);
      });
    });

    describe("when password modified", () => {
      it("should hash password", async () => {
        // Arrange
        const password = "test";
        const user = {
          isModified: () => true,
          hashPassword: hashPassword,
          password: password
        };

        // Act
        await user.hashPassword(jest.fn);

        // Assert
        expect(user.password).not.toBe(password);
      });
    });
  });

  describe("updateModified", () => {
    describe("when no modifications", () => {
      it("should ignore", async () => {
        // Arrange
        const modified = new Date();
        const user = {
          isModified: () => false,
          updateModified: updateModified,
          modified: modified
        };

        // Act
        user.updateModified(jest.fn);

        // Assert
        expect(user.modified).toBe(modified);
      });
    });

    describe("when modifications", () => {
      it("should set modified property", async () => {
        // Arrange
        const modified = new Date();
        const user = {
          isModified: () => true,
          updateModified: updateModified,
          modified: modified
        };

        // Act
        user.updateModified(jest.fn);

        // Assert
        expect(user.modified).not.toBe(modified);
      });
    });
  });

  describe("configureNewUser", () => {
    describe("when not new user", () => {
      it("should ignore", async () => {
        // Arrange
        const created = new Date();
        const user = {
          isNew: false,
          configureNewUser: configureNewUser,
          created: created
        };

        // Act
        user.configureNewUser(jest.fn);

        // Assert
        expect(user.created).toBe(created);
      });
    });

    describe("when new user", () => {
      it("should set created property", async () => {
        // Arrange
        const created = new Date();
        const user = {
          isNew: true,
          configureNewUser: configureNewUser,
          created: created
        };

        // Act
        user.configureNewUser(jest.fn);

        // Assert
        expect(user.created).not.toBe(created);
      });
    });
  });

  describe("comparePassword", () => {
    describe("when password is incorrect", () => {
      it("should return false", async () => {
        // Arrange
        const password = await hash("test", 10);
        const user = {
          comparePassword: comparePassword,
          password: password
        };

        // Act
        const match = await user.comparePassword("test1");

        // Assert
        expect(match).toBe(false);
      });
    });

    describe("when password is correct", () => {
      it("should return true", async () => {
        // Arrange
        const password = await hash("test", 10);
        const user = {
          comparePassword: comparePassword,
          password: password
        };

        // Act
        const match = await user.comparePassword("test");

        // Assert
        expect(match).toBe(true);
      });
    });
  });
});
