import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { environment } from '../environments/environment';

describe('App', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ApoRaviz_DevEng');
  });

  it('should show backend status after a successful health check', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Backend has not been checked yet.');

    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();

    button?.click();
    fixture.detectChanges();

    expect(button?.disabled).toBe(true);
    expect(compiled.textContent).toContain('Checking backend...');

    const request = httpTestingController.expectOne(`${environment.apiBaseUrl}/health`);
    expect(request.request.method).toBe('GET');

    request.flush({ status: 'ok' });
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Backend status: ok');
    expect(button?.disabled).toBe(false);
  });

  it('should show an error message when the health check fails', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    button?.click();

    const request = httpTestingController.expectOne(`${environment.apiBaseUrl}/health`);

    request.flush(
      { message: 'Internal server error' },
      {
        status: 500,
        statusText: 'Internal Server Error',
      },
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Unable to connect to the backend.');
    expect(button?.disabled).toBe(false);
  });
});
