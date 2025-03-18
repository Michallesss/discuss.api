import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const corsOptions = {
  //   origin: process.env.FRONTEND_URL,
  //   credentials: true,
  // };
  // app.enableCors(corsOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const swagger = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swagger(), {
    jsonDocumentUrl: 'api/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
