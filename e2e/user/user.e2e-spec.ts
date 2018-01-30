import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { UserModule } from "../../src/user/user.module";
import { ValidationPipe } from "../../src/validation.pipe";
import { INestApplication } from "@nestjs/common";
import { ObjectId } from "bson";

interface TestUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const getValidUser = (): TestUser => {
  return {
    username: new ObjectId().toHexString() + "@email.com",
    password: "test1234",
    firstName: "Test",
    lastName: "Test"
  };
};

describe("UserModule", () => {
  const server = express();
  server.use(bodyParser.json());


  beforeAll(async () => {
    // This was needed to stop jest.setTimeout errors when building the database in memory.
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const module = await Test.createTestingModule({
      imports: [UserModule]
    }).compile();

    const app = module.createNestApplication(server);
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  let user1: TestUser;
  let user2: TestUser;
  beforeEach(async () => {
    user1 = getValidUser();
    user2 = getValidUser();
  });

  describe("POST /auth/new", () => {
    describe("when model valid", () => {
      it("should return 201", async () => {
        // Arrange
        const req = request(server)
          .post("/auth/new")
          .send(user1);

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(201);
        expect(res.body.token).toBeDefined();
      });
    });

    describe("when model invalid", () => {
      it("should return 406", async () => {
        // Arrange
        const req = request(server)
          .post("/auth/new")
          .send({});

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(406);
        expect(res.body.error).toBeDefined();
      });
    });

    describe("when user exists", () => {
      it("should return 400", async () => {
        // Arrange
        await request(server)
          .post("/auth/new")
          .send(user1);

        user2.username = user1.username;

        const req = request(server)
          .post("/auth/new")
          .send(user2);

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(400);
      });
    });
  });

  describe("POST /auth", () => {
    describe("when model valid", () => {
      it("should return 200", async () => {
        await request(server)
          .post("/auth/new")
          .send(user1);

        // Arrange
        const req = request(server)
          .post("/auth")
          .send(user1);

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
      });
    });

    describe("when model invalid", () => {
      it("should return 406", async () => {
        // Arrange
        const req = request(server)
          .post("/auth")
          .send({});

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(406);
        expect(res.body.error).toBeDefined();
      });
    });

    describe("when user not found", () => {
      it("should return 400", async () => {
        // Arrange
        const req = request(server)
          .post("/auth")
          .send(user1);

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(400);
      });
    });
  });

  describe("POST /auth/exists", () => {
    describe("when not existing", () => {
      it("should return 200", async () => {
        // Arrange
        const req = request(server).post(
          "/auth/exists?username=" + user1.username
        );

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(200);
      });
    });
    describe("when existing", () => {
      it("should return 200", async () => {
        // Arrange
        await request(server)
          .post("/auth/new")
          .send(user1);
        const req = request(server).post(
          "/auth/exists?username=" + user1.username
        );

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(200);
      });
    });
  });

  describe("PUT /user/profile", () => {
    describe("when token invalid", () => {
      it("should return 401", async () => {
        // Arrange
        const req = request(server)
          .put("/user/profile")
          .set("Authorization", "Bearer " + "anything");

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(401);
      });
    });

    describe("when token valid", () => {
      describe("when model valid", () => {
        it("should return 200", async () => {
          // Arrange
          const authReq = await request(server)
            .post("/auth/new")
            .send(user1);
          const token = authReq.body.token;

          const updateBody = getValidUser();
          const updateReq = request(server)
            .put("/user/profile")
            .set("Authorization", "Bearer " + token)
            .send(user2);

          // Act
          const res = await updateReq;

          // Assert
          expect(res.status).toBe(200);
        });
      });

      describe("when model invalid", () => {
        it("should return 406", async () => {
          // Arrange
          const authReq = await request(server)
            .post("/auth/new")
            .send(user1);
          const token = authReq.body.token;
          const updateReq = request(server)
            .put("/user/profile")
            .set("Authorization", "Bearer " + token)
            .send({});

          // Act
          const res = await updateReq;

          // Assert
          expect(res.status).toBe(406);
        });
      });
    });
  });

  describe("PUT /user/password", () => {
    describe("when token invalid", () => {
      it("should return 401", async () => {
        // Arrange
        const req = request(server)
          .put("/user/password")
          .set("Authorization", "Bearer " + null)
          .send(user1);

        // Act
        const res = await req;

        // Assert
        expect(res.status).toBe(401);
      });
    });

    describe("when token valid", () => {
      describe("when model invalid", () => {
        it("should return 406", async () => {
          // Arrange
          const authReq = await request(server)
            .post("/auth/new")
            .send(user1);
          const token = authReq.body.token;
          const req = request(server)
            .put("/user/password")
            .set("Authorization", "Bearer " + token)
            .send({});

          // Act
          const res = await req;

          // Assert
          expect(res.status).toBe(406);
        });
      });

      describe("when model valid", () => {
        describe("when password incorrect", () => {
          it("should return 400", async () => {
            // Arrange
            const authReq = await request(server)
              .post("/auth/new")
              .send(user1);
            const token = authReq.body.token;

            const body = {
              password: "1234567890",
              newPassword: "0123456789"
            };
            const req = request(server)
              .put("/user/password")
              .set("Authorization", "Bearer " + token)
              .send(body);

            // Act
            const res = await req;

            // Assert
            expect(res.status).toBe(400);
          });
        });

        describe("when password correct", () => {
          it("should return 200", async () => {
            // Arrange
            const authReq = await request(server)
              .post("/auth/new")
              .send(user1);
            const token = authReq.body.token;

            const body = {
              password: user1.password,
              newPassword: "newPassword1234"
            };
            const req = request(server)
              .put("/user/password")
              .set("Authorization", "Bearer " + token)
              .send(body);

            // Act
            const res = await req;

            // Assert
            expect(res.status).toBe(200);
          });
        });
      });
    });
  });
});
