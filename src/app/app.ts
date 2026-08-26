import { Component, inject, signal } from '@angular/core';
import { HealthApi, type HealthResponse } from './services/health-api';
type HealthViewState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ApoRaviz_DevEng');
  protected readonly healthState = signal<HealthViewState>('idle');
  protected readonly healthResponse = signal<HealthResponse | null>(null);
  private readonly healthApi = inject(HealthApi);

  protected checkHealth(): void {
    this.healthState.set('loading');
    this.healthResponse.set(null);

    this.healthApi.getHealth().subscribe({
      next: (response) => {
        this.healthResponse.set(response);
        this.healthState.set('success');
      },
      error: () => {
        this.healthState.set('error');
      },
    });
  }
}
