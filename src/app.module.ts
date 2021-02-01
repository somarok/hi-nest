import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [AppController], //url 을 가져오고 함수를 실행함.
  providers: [],
})
export class AppModule {}
