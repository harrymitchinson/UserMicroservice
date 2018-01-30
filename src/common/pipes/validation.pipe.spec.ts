import { IsString } from "class-validator";
import { ValidationPipe } from ".";
import { ArgumentMetadata } from "@nestjs/common";

describe("ValidationPipe", () => {
  class TestModel {
    @IsString() public prop1: string;
    @IsString() public prop2: string;
  }

  const metadata: ArgumentMetadata = {
    type: "body",
    metatype: TestModel,
    data: ""
  };

  const pipe = new ValidationPipe();

  describe("transform", () => {
    describe("when no validation on class", () => {
      it("should return the value unchanged", async () => {
        // Arrange
        const testObj = { prop1: "value1", prop2: "value2" };

        // Act
        const result = pipe.transform(testObj, {} as any);

        // Assert
        await expect(result).resolves.toEqual(testObj);
      });
    });
    describe("when validation on class and properties valid", () => {
      it("should return the value unchanged", async () => {
        // Arrange
        const testObj = { prop1: "value1", prop2: "value2" };

        // Act
        const result = pipe.transform(testObj, metadata);

        // Assert
       await expect(result).resolves.toEqual(testObj);
      });
    });
    describe("when validation fails", () => {
      it("should throw an error", async () => {
        // Arrange
        const testObj = { };

        // Act
        const result = pipe.transform(testObj, metadata);

        // Assert
        await expect(result).rejects.toThrow();
      });
    });
  });
});
