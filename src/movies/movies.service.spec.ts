import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트하기 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll",() =>{

    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });


  describe('getOne',() => {
  it("should return a movie", () => {
    service.create({
      title:"TestMovie",
      genres:['test'],
      year:2000,
      });
    const movie = service.getOne(1);
    expect(movie).toBeDefined();
    expect(movie.id).toEqual(1);
  });
  it("it should throw 404 error", () =>{
    try{

      service.getOne(999);
    }catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual('Movie with ID : 999 not found.');
    }
  });
});

//delete 테스트
describe("deleteOne",() =>{
it("deletes a movie", () => {
    service.create({
      title:"TestMovie",
      genres:['test'],
      year:2000,
    });
    const allMovies = service.getAll().length; 
    service.deleteOne(1);
    const afterDelete = service.getAll().length; 
    expect(afterDelete).toBeLessThan(allMovies); //영화데이터 배열 길이 값이 정보를 1개 지운 값이 맞는지 확인
    });

    it("should return a 404", () =>{ //이상한 아이디로 호출 할 경우, 에러메세지 리턴.
      try{
        service.deleteOne(999)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  //생성
  describe("creat", () =>{
    it("should create a movie", ()=>{
      const beforeCreate =service.getAll().length;
      service.create({
        title:"TestMovie",
        genres:['test'],
        year:2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
});

describe("update", () =>{
  it("should update a movie", () => {
    service.create({
      title:"TestMovie",
      genres:['test'],
      year:2000,
    });
    service.update(1,{title:'Updated Test'});
    const movie = service.getOne(1);
    expect(movie.title).toEqual('Updated Test');    
  });
  it("should throw a NotFoundException", () =>{ //이상한 아이디로 호출 할 경우, 에러메세지 리턴.
    try{
      service.update(999,{});
    }catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});

});
