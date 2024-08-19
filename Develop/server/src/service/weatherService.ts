import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  description: string;
  temp: number;
  humidity: number;
  wind: number;
  uv: number;
  icon: string;

  constructor(
    city: string,
    date: string,
    description: string,
    temp: number,
    humidity: number,
    wind: number,
    uv: number,
    icon: string
  ) {
    this.city = city;
    this.date = date;
    this.description = description;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
    this.uv = uv;
    this.icon = icon;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseUrl?: string;
  private apiKey?: string;
  // TODO: Define the baseURL, API key, and city name properties
  constructor() {
    this.baseUrl = process.env.WEATHER_API_URL || "default_url";
    this.apiKey = process.env.WEATHER_API_KEY || "default_key";
    
  }
  
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<any> {
    try {
    const response = await fetch(this.buildGeocodeQuery(query));
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch location data', error);
    throw error;
  }
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private async destructureLocationData(locationData: any): Promise<Coordinates> {
    const { lat, lng } = locationData.results[0].locations[0].latLng;
    return { lat, lon: lng };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(query: string): string {
    return `${this.baseUrl}/geocode/v1/json?q=${encodeURIComponent(query)}&apiKey=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseUrl}/currentConditions/v1/${coordinates.lat},${coordinates.lon}?apiKey=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch weather data', error);
    throw error;
  }
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(city: string, response: any): Weather {
    const weatherData = response[0];
    return new Weather(
      city,
      new Date(weatherData.LocalObservationDateTime).toLocaleDateString(),
      weatherData.WeatherText,
      weatherData.Temperature.Metric.Value,
      weatherData.RelativeHumidity,
      weatherData.Wind.Speed.Metric.Value,
      weatherData.UVIndex,
      weatherData.WeatherIcon
    );
  }

  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map((weather) => {
      return new Weather(
        currentWeather.city,
        weather.LocalObservationDateTime,
        weather.WeatherText,
        weather.Temperature.Metric.Value,
        weather.RelativeHumidity,
        weather.Wind.Speed.Metric.Value,
        weather.UVIndex,
        weather.WeatherIcon
      );
    });
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const currentWeather = await this.fetchWeatherData(coordinates);
    const weatherData = await this.buildForecastArray(currentWeather, currentWeather);
    return this.parseCurrentWeather(city, weatherData);
  }
}

export default new WeatherService();
