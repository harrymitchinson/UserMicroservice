import { UserDecorator, decoratorFunction } from "./user.decorator";

describe("UserDecorator", () => {
  describe("when user is present in request", () => {
    it("should return the user", () => {
      // Arrange
      const req: any = { user: "" };

      // Act
      const decorator = decoratorFunction(undefined, req);

      // Assert
      expect(decorator).toEqual(req.user);
    });
  });
});
