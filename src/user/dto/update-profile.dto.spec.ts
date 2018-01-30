import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { UpdateProfileDto } from ".";
import { validate } from "class-validator";

describe("UpdateProfileDto", () => {
  const validUsername = "valid@email.com";
  const invalidUsername = "invalid";
  const validName = "valid";
  const invalidName = "";

  describe("when username is not email", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new UpdateProfileDto({
        username: invalidUsername,
        firstName: validName,
        lastName: validName
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when firstName is empty", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new UpdateProfileDto({
        username: validUsername,
        firstName: invalidName,
        lastName: validName
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("when lastName is empty", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new UpdateProfileDto({
        username: validUsername,
        firstName: validName,
        lastName: invalidName
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
      const model = new UpdateProfileDto({
        username: validUsername,
        firstName: validName,
        lastName: validName
      });

      // Act
      const result = await validate(model);

      // Assert
      expect(result.length).toBe(0);
    });
  });
});
