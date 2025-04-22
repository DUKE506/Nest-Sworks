import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

declare const module: any;

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['Authorization'], // * 사용할 헤더 추가.
  });

  const options = new DocumentBuilder()
    .setTitle('S-Works API')
    .setDescription('S-Works 서버 API문서입니다.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [],
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log('NODE_ENV => ', process.env.NODE_ENV);
}
bootstrap();
