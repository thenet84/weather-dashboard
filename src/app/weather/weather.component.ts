import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city = '';
  weather: any = null;
  error = '';

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weather = null;
    this.error = '';

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => this.weather = data,
      error: () => this.error = 'City not found.'
    });
  }
}
