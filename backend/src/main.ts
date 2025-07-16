import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend integration
  app.enableCors();
  
  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip properties that do not have decorators
    forbidNonWhitelisted: true, // throw errors if non-whitelisted properties are present
    transform: true, // automatically transform payloads to DTO instances
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();