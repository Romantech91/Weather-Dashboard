import fs from 'node:fs/promises';

import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties

class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private async read() {
  //   try {
  //     return new Promise<string>((resolve, reject) => {
  //       fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8', (err, data) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(data);
  //         }
  //       });
  //     });
  // } catch (error) {
  //   console.error('Failed to read search history', error);
  //   throw error;
  // }
  return await fs.readFile ('./db/db.json', {flag: "a+", encoding: 'utf-8'});
  }

  private async write(cities: City[]) {
  //   try {
  //   await new Promise<void>((resolve, reject) => {
  //     fs.writeFile(
  //       path.join(__dirname, 'db', 'db.json'),
  //       JSON.stringify(cities, null, 2),
  //       (err) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve();
  //         }
  //       }
  //     );
  //   });
  // } catch (error) {
  //   console.error('Failed to write search history', error);
  //   throw error;
  // }
  return await fs.writeFile('./db/db.json', JSON.stringify(cities, null, 2), 'utf-8');
   }

  async getCities(): Promise<City[]> {
    try {
      const cities = await this.read();
      let parsedCities: City[] = [];
      try {
        parsedCities = JSON.parse(cities) || [];
      } catch (error) {
        console.error('Error parsing JSON:', error);
        parsedCities = [];
      }
      return parsedCities;
    } catch (error) {
      return [];
    }
  }

  async addCity(city: string): Promise<City> {
   if (!city) {
     throw new Error('City name is required');
    }
    const newCity = new City(uuidv4(), city);
    try {
      const cities = await this.getCities();
      if (cities.find((index) => index.name === city)) {
        return newCity;
      }
      const updatedCities = [...cities, newCity];
      await this.write(updatedCities);
      return newCity;
    } catch (error) {
      console.error('Error adding city:', error);
      throw error;
    }
  }

  async removeCity(id: string): Promise<void> {
    try {
      const cities = await this.getCities();
      const filteredCities = cities.filter((city) => city.id !== id);
      await this.write(filteredCities);
    } catch (error) {
      console.error('Error removing city:', error);
      throw error;
    }
  }
}
  

  


  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}


export default new HistoryService();
