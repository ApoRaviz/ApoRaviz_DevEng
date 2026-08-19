import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface HealthResponse {
  status: 'ok';
}

@Service()
export class HealthApi {
  private readonly healthUrl = `${environment.apiBaseUrl}/health`;
  private readonly httpClient = inject(HttpClient);

  getHealth(): Observable<HealthResponse> {
    return this.httpClient.get<HealthResponse>(this.healthUrl);
  }
}
