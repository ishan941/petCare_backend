import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ModulesModule } from './modules/modules.module';

async function bootstrap() {
  const app = await NestFactory.create(ModulesModule);
  const config = new DocumentBuilder()
    .setTitle('Petcare example')
    .setDescription('API for petcare application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Petcare')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3007);
}
bootstrap();
