import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { validate } from "class-validator";
import { AuthService } from ".";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../../app.constants";

describe("AuthService", () => {
  const service = new AuthService();

  describe("createToken", () => {
    describe("when called with user", () => {
      it("should return jwt", async () => {
        // Arrange
        const user: any = { id: "test" };

        // Act
        const result = await service.create(user);

        // Assert
        expect(result.token).toBeTruthy();
      });

      it("should return valid jwt", async () => {
        // Arrange
        const user: any = { id: "test" };
        const token = await service.create(user);

        // Act
        const result: any = verify(token.token, JWT_SECRET);

        // Assert
        expect(result.sub).toBeTruthy();
      });
    });
  });
});
