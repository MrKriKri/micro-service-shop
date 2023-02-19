import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import {constant} from "./constant";


async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3000);
}

bootstrap();
