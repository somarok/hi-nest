import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //class 유효성 검사를 위한 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //decorator가 없는 obj는 거름.
      forbidNonWhitelisted: true, //지정하지 않은 데이터는 막음.
      transform: true, //데이터 타입을 설정한 것으로 자동 변환해줌
    })
  )
  await app.listen(3000);
}
bootstrap();
