import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/configure-app';

interface HttpErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
}

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('/missing (GET)', () => {
    return request(app.getHttpServer())
      .get('/missing')
      .expect(404)
      .expect((response) => {
        const body = response.body as HttpErrorResponse;

        expect(body.statusCode).toBe(404);
        expect(typeof body.timestamp).toBe('string');
        expect(body.path).toBe('/missing');
        expect(body.message).toBe('Cannot GET /missing');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
