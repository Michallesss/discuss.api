import { NestFactory } from '@nestjs/core';
// https://docs.nestjs.com/openapi/introduction#installation
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Discuss.API')
    .setDescription('Discuss.it web API')
    .setVersion('0.1')
    .addTag('discuss')
    .build();
  const swagger = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swagger(), {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
