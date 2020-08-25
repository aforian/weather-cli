import axios from 'axios';
import chalk from 'chalk';

import { convertDate } from '../utils/dateConverter';

const HTTPClient = axios.create({
  baseURL: 'https://www.metaweather.com',
});

/**
 * @param {Object} option - The option for searching weather forcast.
 * @param {string} employee.place - The place for search.
 * @param {Date} employee.date - The date for search. format: YYYY-MM-DD
 */
const getWeather = async (option) => {
  const { place, date: rawDate } = option;
  const date = convertDate(rawDate);

  try {
    const { data: placeResults } = await HTTPClient({
      method: 'GET',
      url: `/api/location/search/?query=${place}`,
    });
    if (!placeResults.length) {
      throw `Place not support in api: "${chalk.red.bold`${place}`}".`;
    }

    const locationId = placeResults[0]['woeid'];
    const title = placeResults[0]['title'];

    const { data: { consolidated_weather } } = await HTTPClient({
      method: 'GET',
      url: `/api/location/${locationId}`,
    })
    const currentData = consolidated_weather.find((weatherInfo) => (
      weatherInfo.applicable_date === date
    ))
    if (currentData) {
      const { max_temp, min_temp, weather_state_name } = currentData;

      console.log(`${chalk.cyan.bold`${title}`} ${chalk.bold`Today's weather:`}`);
      console.log(`Max temp: ${chalk.blue.bold`${Math.round(max_temp)}`}°C`);
      console.log(`Min temp: ${chalk.red.bold`${Math.round(min_temp)}`}°C`);
      console.log(`Weather state: ${chalk.bold`${weather_state_name}`}`);
    } else {
      console.log(`No specific date weather info.`);
    }
  } catch (e) {
    console.log(e);
  }
};
export default getWeather;

