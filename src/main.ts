import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./common/pipes";
import { ROUTE_PREFIX, PORT } from "./app.constants";

/**
 * Bootstrap the application.
 * @export
 * @param {*} app
 */
export async function bootstrap(app: any) {
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(ROUTE_PREFIX);
  await app.listen(PORT);
}

/**
 * Start the bootstrap process for the application.
 */
const start = () => NestFactory.create(AppModule).then(bootstrap);
