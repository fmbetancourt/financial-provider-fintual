import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './infrastructure/exceptions/exception.filter';
import { HttpExceptionFilter } from './infrastructure/exceptions/http-exception.filter';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  // Set global prefix
  app.setGlobalPrefix(<string>configService.get('app.apiPrefix'));

  // Enable CORS
  app.enableCors();

  // Set up global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Set up global filters
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // Set up global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // Set up Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fintual API Provider')
    .setDescription('API documentation for the Fintual API integration')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'User management')
    .addTag('goals', 'Goal management')
    .addTag('investments', 'Investment management')
    .addTag('portfolios', 'Portfolio management')
    .addTag('series', 'Series management')
    .addTag('market-data', 'Market data operations')
    .build();
    
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api/docs`);
}
bootstrap();
