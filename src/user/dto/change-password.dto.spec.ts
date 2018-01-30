import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { ChangePasswordDto } from ".";
import { validate } from "class-validator";

describe("ChangePasswordDto", () => {
  const validPassword = "valid1234";
  const invalidPassword = "invalid";

  describe("when password is not at least 8 characters", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new ChangePasswordDto({
        password: invalidPassword,
        newPassword: validPassword
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when newPassword is not at least 8 characters", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new ChangePasswordDto({
        password: validPassword,
        newPassword: invalidPassword
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when newPassword is equal to password", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new ChangePasswordDto({
        password: validPassword,
        newPassword: validPassword
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when properties are valid", () => {
    it("should return no errors", async () => {
      // Arrange
      const model = new ChangePasswordDto({
        password: validPassword,
        newPassword: validPassword + "1"
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBe(0);
    });
  });
});
