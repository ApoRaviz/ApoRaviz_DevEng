import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

export interface HealthResponse {
  status: 'ok';
}

@Service()
export class HealthApi {
  private readonly healthUrl = 'http://localhost:3000/health';
  private readonly httpClient = inject(HttpClient);

  getHealth(): Observable<HealthResponse> {
    return this.httpClient.get<HealthResponse>(this.healthUrl);
  }
}
