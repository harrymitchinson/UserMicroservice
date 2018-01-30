import { bootstrap } from "./main";
import { NestFactory, NestApplication } from "@nestjs/core";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { ROUTE_PREFIX, PORT } from "./app.constants";

describe("Main", () => {
  describe("bootstrap", () => {
    let mockApp: any;

    // Arrange
    mockApp = {
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn()
    };

    beforeAll(async () => {
      // Act
      const app = await bootstrap(mockApp);
    });

    describe("useGlobalPipes", () => {
      it("should apply ValidationPipe", () => {
        // Assert
        expect(mockApp.useGlobalPipes).toBeCalledWith(new ValidationPipe());
      });
    });

    describe("setGlobalPrefix", () => {
      it("should apply ROUTE_PREFIX constant", () => {
        // Assert
        expect(mockApp.setGlobalPrefix).toBeCalledWith(ROUTE_PREFIX);
      });
    });

    describe("listen", () => {
      it("should listen on PORT constant", () => {
        // Assert
        expect(mockApp.listen).toBeCalledWith(PORT);
      });
    });
  });
});
