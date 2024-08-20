# <Weather Dashboard>

![Node.js](https://img.shields.io/badge/node.js-v16.13.0-green)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://github.com/username/repository/workflows/Node.js%20CI/badge.svg)
![Dependencies](https://img.shields.io/david/username/repository)
![Express.js](https://img.shields.io/badge/express.js-4.x-blue)

## Description

This project is an Express.js REST API that allows users to retrieve weather information for cities and maintain a search history. The application interacts with external weather APIs to provide up-to-date weather data, and stores the cities that users search for in a simple JSON-based database. This allows users to track and manage their previous searches.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Romantech91/Weather-Dashboard.git

   ```

2. Install dependencies

   ```bash
   npm install

   ```

3. Run the application
   ```bash
   npm start
   ```

## Usage

- Weather Tracking: Users can quickly check the weather for multiple cities and revisit their searches later.

- Simple History Management: The API offers endpoints to manage (add, retrieve, delete) the search history, making it a useful backend service for applications that require weather data and historical tracking.

- Learning Resource: The project serves as a good example for beginners who want to learn how to create REST APIs with Express.js, manage data storage with JSON files, and integrate third-party services like weather APIs.

## Credits

N/A

## License

MIT License

Copyright (c) 2024 Romantech91

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Features

- Weather Data Retrieval: The API fetches current weather data for a given city, using reliable external weather services.

- Search History Management: Each time a user searches for a city's weather, the city is saved to a search history. This history can be retrieved to see all past searches, or individual cities can be deleted from the history.

- JSON-Based Storage: The search history is stored in a local JSON file, making it easy to manage and lightweight. This is ideal for small-scale applications and quick deployments.

## How to Contribute

## Tests

## Questions

If you have any questions, please reach out to me at victor_roman1198@yahoo.com or visit my GitHub profile at @Romantech91.
