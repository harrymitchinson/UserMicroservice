import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./common/pipes";
import { ROUTE_PREFIX, PORT } from "./app.constants";

export async function bootstrap(app: any) {
  // Register validation pipe. <- had to make a copy of the Nest validation pipe as its currently not working.
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(ROUTE_PREFIX);

  await app.listen(PORT);
}

export const start = () => NestFactory.create(AppModule).then(bootstrap);
