import { Test, TestingModule } from '@nestjs/testing';
import { Delete, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
     //테스트를 위한 어플리케이션 생성. 기본 상태로는 pipe에 올리는 설정이 없기 때문에 형변환이 자동으로 되지 않는다.
    const moduleFixture: TestingModule = await Test.createTestingModule({ 
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    
    //따라서, 실제 어플리케이션처럼 작동하도록 실제 구동 환경을 설정해준다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,  //decorator가 없는 obj는 거름.
        forbidNonWhitelisted: true, //지정하지 않은 데이터는 막음.
        transform: true, //데이터 타입을 설정한 것으로 자동 변환해줌
      }),
    );    
    await app.init();
  });

  //url에 대한 요청 테스팅. 컨트롤러, 서비스, 파이프의 결과에 대해 모든 테스트를 하는 셈.
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my Movie api');
  });

  describe('/movies',() =>{
    it("GET",() =>{
      return request(app.getHttpServer())
    .get("/movies")
    .expect(200)
    .expect([]);
     });
     it("Post 201",() =>{
       return request(app.getHttpServer())
       .post('/movies')
       .send({
         title:"Test",
         year:2000,
         genres:['test'],
       })
       .expect(201);
     });

     it('Delete',() =>{
      return request(app.getHttpServer()).delete('/movies').expect(404);
     });
  });

  describe('/movies/:id', () =>{
    it('GET 200',() =>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });
    it('GET 404',() =>{
      return request(app.getHttpServer())
      .get('/movies/1123')
      .expect(404);
    });

    it("Post 201",() =>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year:2000,
        genres:['test']
      })
      .expect(201);
    });

    it("Post 400",() =>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year:2000,
        genres:['test'],
        other:'thing'
      })
      .expect(400);
    });



    it('PATCH 200',() =>{
      return request(app.getHttpServer())
      .patch('/movies/1') 
      .send({
        title:"Updated Test"        
      })
      .expect(200);
    });

    it('DELETE 200',() =>{
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  })

});

