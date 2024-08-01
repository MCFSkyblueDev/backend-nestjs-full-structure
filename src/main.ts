import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { HttpExceptionFilter } from '@exception/http-exception.filter';
import { LoggingInterceptor } from '@interceptor/logging.interceptor';
import { TransformInterceptor } from '@interceptor/transform.interceptor';

// import { CorsMiddleware } from '@middleware/cors.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  // app.use(CorsMiddleware);
  // app.useGlobalInterceptors(new PaginationInterceptor());

  //cors
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,POST,PUT,DELETE,PATCH',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });

  const config = new DocumentBuilder()
    .setTitle('NESTJS STRUCTURE')
    .setDescription('NESTJS STRUCTURE ')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap();
