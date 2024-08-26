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
    
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(query: string): string {
    //https://api.openweathermap.org/geocode/v1/json?q=Avondale&apiKey=c7536ffcf0fbc521c2aaa4237873e7c6
    //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
    return `${this.baseUrl}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`;

  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    //https://api.openweathermap.org/currentConditions/v1/33.4355977,-112.349602?apiKey=c7536ffcf0fbc521c2aaa4237873e7c6
    //api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
    return `${this.baseUrl}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(query);
    //console.log(locationData, 'locationData');
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      console.log(this.buildWeatherQuery(coordinates), 'buildWeatherQuery');
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
    const weatherData = response.list[0];
    return new Weather(
      city,
      weatherData.dt_txt,
      weatherData.weather[0].description,
      weatherData.main.temp,
      weatherData.main.humidity,
      weatherData.wind.speed,
      weatherData.uvi,
      weatherData.weather[0].icon
    );
  }

  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map((weather) => {
      return new Weather(
        currentWeather.city,
        weather.dt_txt,
        weather.weather[0].description,
        weather.main.temp,
        weather.main.humidity,
        weather.wind.speed,
        weather.uvi,
        weather.weather[0].icon
      );
    });
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string) {
  //this coordinates works
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherResponse = await this.fetchWeatherData(coordinates);
    //this current weather works
    const currentWeather = this.parseCurrentWeather(city, weatherResponse);
   
    const weatherData = this.buildForecastArray(currentWeather, weatherResponse.list);
    console.log(weatherData, 'weatherData');
    return weatherData;
  }
}

export default new WeatherService();
