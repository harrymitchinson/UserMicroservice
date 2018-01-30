import { AuthMiddleware } from "./auth.middleware";
import { UnauthorizedException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../app.constants";

describe("AuthMiddleware", () => {
  const middleware = new AuthMiddleware();

  describe("when not authorization header", () => {
    it("should be UnauthorizedException", () => {
      // Arrange
      const req: any = { headers: { test: "test" } };
      const callback = jest.fn();

      // Act
      const result = middleware.resolve()(req, undefined, callback);

      // Assert
      expect(callback).toBeCalledWith(expect.any(UnauthorizedException));
    });
  });

  describe("when authorization header is incorrect format", () => {
    it("should be UnauthorizedException", () => {
      // Arrange
      const req: any = { headers: { authorization: "Basic" } };
      const callback = jest.fn();

      // Act
      const result = middleware.resolve()(req, undefined, callback);

      // Assert
      expect(callback).toBeCalledWith(expect.any(UnauthorizedException));
    });
  });

  describe("when authorization header is not bearer strategy", () => {
    it("should be UnauthorizedException", () => {
      // Arrange
      const req: any = { headers: { authorization: "Basic test/test" } };
      const callback = jest.fn();

      // Act
      const result = middleware.resolve()(req, undefined, callback);

      // Assert
      expect(callback).toBeCalledWith(expect.any(UnauthorizedException));
    });
  });

  describe("when authorization header is invalid token", () => {
    it("should be UnauthorizedException", () => {
      // Arrange
      const req: any = { headers: { authorization: "Bearer jwt" } };
      const callback = jest.fn();

      // Act
      const result = middleware.resolve()(req, undefined, callback);

      // Assert
      expect(callback).toBeCalledWith(expect.any(UnauthorizedException));
    });
  });

  describe("when authorization header is valid token", () => {
    it("should set user on request", () => {
      // Arrange
      const subject = "test";
      const token = sign({}, JWT_SECRET, { expiresIn: 600, subject: subject });
      const req: any = {
        user: undefined,
        headers: { authorization: "Bearer " + token }
      };
      const callback = jest.fn();

      // Act
      const result = middleware.resolve()(req, undefined, callback);

      // Assert
      expect(req.user).toBeTruthy();
      expect(req.user.sub).toBe(subject);
    });
  });
});
