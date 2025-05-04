import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClientTesting() 
      ]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch weather data by city', () => {
    const dummyWeather = {
      name: 'Berlin',
      weather: [{ description: 'sunny' }],
      main: { temp: 23 },
      wind: { speed: 4 }
    };

    service.getWeatherByCity('Berlin').subscribe(data => {
      expect(data.name).toBe('Berlin');
      expect(data.main.temp).toBe(23);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'GET' &&
      req.url.includes('weather') &&
      req.url.includes('Berlin')
    );
    req.flush(dummyWeather);

    httpMock.verify();
  });
});
