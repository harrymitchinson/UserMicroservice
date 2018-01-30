import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { CreateDto } from ".";
import { validate } from "class-validator";

describe("CreateDto", () => {
  const validUsername = "valid@email.com";
  const invalidUsername = "invalid";
  const validPassword = "valid1234";
  const invalidPassword = "invalid";
  const validName = "valid";
  const invalidName = "";

  describe("when username is not email", () => {
    it("should return errors", async () => {
      // Arrange
      const model = new CreateDto({
        username: invalidUsername,
        password: validPassword,
        firstName: validName,
        lastName: validName
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
      const model = new CreateDto({
        username: validUsername,
        password: invalidPassword,
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
      const model = new CreateDto({
        username: validUsername,
        password: validPassword,
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
      const model = new CreateDto({
        username: validUsername,
        password: validPassword,
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
      const model = new CreateDto({
        username: validUsername,
        password: validPassword,
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
