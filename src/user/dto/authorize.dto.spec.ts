import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { AuthorizeDto } from ".";
import { validate } from "class-validator";

describe("AuthoriseDto", () => {
  const validUsername = "valid@email.com";
  const invalidUsername = "invalid";
  const validPassword = "valid1234";
  const invalidPassword = "invalid";

  describe("when username is not email", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new AuthorizeDto({
        username: invalidUsername,
        password: validPassword
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when password is not at least 8 characters", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new AuthorizeDto({
        username: validUsername,
        password: invalidPassword
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
      const model = new AuthorizeDto({
        username: validUsername,
        password: validPassword
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBe(0);
    });
  });
});
