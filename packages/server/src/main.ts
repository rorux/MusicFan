import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MusicFan')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  await app.listen(port || 3000, () => {
    console.log(`Server started at port ${port}..`);
  });
}
bootstrap();
