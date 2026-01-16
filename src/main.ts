import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://104.131.48.1/'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
