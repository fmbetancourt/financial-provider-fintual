import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Goal Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/goals (GET)', () => {
    return request(app.getHttpServer())
      .get('/goals')
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('meta');
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it('/goals/:id (GET)', () => {
    const mockGoalId = '123'; // Replace with an actual ID in real tests
    return request(app.getHttpServer())
      .get(`/goals/${mockGoalId}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id', mockGoalId);
      });
  });
});
