import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
  Logger
} from "@nestjs/common";
import { LoggerMiddleware } from "./middlewares";

@Module({
  imports: [],
  controllers: [],
  components: []
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .with(new Logger("Request", true))
      .forRoutes({ path: "/**", method: RequestMethod.ALL });
  }
}
