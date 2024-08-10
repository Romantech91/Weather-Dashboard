import { Router, type Request, type Response } from 'express';
const router = Router();
import { HistoryService } from '../../service/historyService.js';
import { WeatherService } from '../../service/weatherService.js';

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;
    const weatherData = await WeatherService.getWeatherByCity(city);
    const history = await HistoryService.saveCity(city);
    res.status(200).json({ weatherData, history });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
 
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});
 try {
    const history = await HistoryService.getHistory();
    if (!history || history.length === 0) {
      return res.status(404).json({ message: 'No history found' });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});
 try {
    const { id } = req.params;
    const deleted = await HistoryService.deleteCity(id);
    if (!deleted) {
      res.status(404).json({ message: 'No history found' });
    }
    res.status(200).json({ message: 'City deleted', deleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
export default router;
