import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;
    const weatherData = await WeatherService.getWeatherForCity(city);
    const history = await HistoryService.addCity(city);
    res.status(200).json({ weatherData, history });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

// GET search history
router.get('/history', async (_, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    if (!history || history.length === 0) {
      return res.status(404).json({ message: 'No history found' });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
    return res;
  }
  return res;
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export default router;
