import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './weather.service';
import { of, throwError } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let mockService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('WeatherService', ['getWeatherByCity']);

    await TestBed.configureTestingModule({
      imports: [WeatherComponent, FormsModule],
      providers: [{ provide: WeatherService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show weather on successful fetch', () => {
    const mockWeather = { name: 'Paris', weather: [{ description: 'cloudy', icon: '01d' }], main: { temp: 18, humidity: 50 }, wind: { speed: 2 } };

    component.city = 'Paris';
    mockService.getWeatherByCity.and.returnValue(of(mockWeather));

    component.getWeather();

    expect(component.weather).toEqual(mockWeather);
    expect(component.error).toBe('');
  });

  it('should show error if API call fails', () => {
    component.city = 'Unknown';
    mockService.getWeatherByCity.and.returnValue(throwError(() => new Error('Not Found')));

    component.getWeather();

    expect(component.weather).toBeNull();
    expect(component.error).toBe('City not found.');
  });
});
