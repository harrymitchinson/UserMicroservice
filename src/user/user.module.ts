import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";
import { UserController, AuthContoller } from "./controllers";
import { UserService, AuthService, UserProvider } from "./services";
import { DatabaseModule } from "../database/database.module";
import { AuthMiddleware } from "./middlewares/auth.middleware";

const IMPORTS = [DatabaseModule];
const COMPONENTS = [UserProvider, UserService, AuthService];
const CONTROLLERS = [UserController, AuthContoller];

@Module({ imports: IMPORTS, components: COMPONENTS, controllers: CONTROLLERS })
export class UserModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
