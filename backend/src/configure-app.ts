import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

export function configureApp(app: INestApplication): void {
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  app.useGlobalFilters(new HttpExceptionFilter());
}
