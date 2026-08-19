import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HealthApi, type HealthResponse } from './health-api';
import { environment } from '../../environments/environment';

describe('HealthApi', () => {
  let service: HealthApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HealthApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request the health endpoint', () => {
    expect.assertions(2);
    let actualResponse: HealthResponse | undefined;
    const expectedHealthUrl = `${environment.apiBaseUrl}/health`;

    service.getHealth().subscribe((response) => {
      actualResponse = response;
    });

    const request = httpTestingController.expectOne(expectedHealthUrl);

    expect(request.request.method).toBe('GET');
    request.flush({ status: 'ok' });
    expect(actualResponse).toEqual({ status: 'ok' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
