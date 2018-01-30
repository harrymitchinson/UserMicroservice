import { LoggerMiddleware } from ".";
import { Logger } from "@nestjs/common";

describe("LoggerMiddleware", () => {
  const middleware = new LoggerMiddleware();
  const logger = new Logger("test");

  describe("when resolved", () => {
    it("should log", () => {
      // Arrange
      const req: any = {
        method: "test",
        ip: "test",
        path: "test"
      };
      const mockLogger = jest.fn();
      logger.log = mockLogger;

      // Act
      middleware.resolve(logger)(req, undefined, jest.fn);

      // Assert
      expect(mockLogger).toBeCalled();
    });
  });
});
