import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') //entry point (입장 포인트)
export class MoviesController {

    constructor(readonly moviesService: MoviesService){}

    
    @Get() //라우터
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId:number): Movie{
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }
  
    @Post()
    create(@Body() movieData: CreateMovieDto){        
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId:number){
        return this.moviesService.deleteOne(movieId);
    }

    //patch()는 리소스를 일부만 업뎃해줌. put()은 모든 리소스를 업데이트 함.
    @Patch('/:id')
    patch(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto){
       return this.moviesService.update(movieId, updateData);
    }

  

}
