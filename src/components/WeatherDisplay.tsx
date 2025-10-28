import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Thermometer, Wind, Droplets } from 'lucide-react';
import { WeatherData, Units } from '../types';
import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  units: Units;
  onToggleUnits: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  units,
  onToggleUnits
}) => {
  const { name, main, weather, sys } = weatherData;
  const weatherCondition = weather[0];
  const WeatherIcon = getWeatherIcon(weatherCondition.main);

  const temperature = formatTemperature(main.temp, units);

  const feelsLike = formatTemperature(main.feels_like, units);
  console.log('WeatherDisplay Rendered', temperature);

  // Calculate if it's day or night
  const currentTime = new Date().getTime() / 1000;
  const isDay = currentTime > sys.sunrise && currentTime < sys.sunset;

  // Format date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            {name}, {sys.country}
          </h1>
          <p className="text-lg opacity-80">{formattedDate}</p>
        </div>
        <button
          onClick={onToggleUnits}
          className="mt-4 md:mt-0 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-white transition-all duration-300"
        >
          {units === 'metric' ? '°C' : '°F'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-6 md:mb-0">
          <div className="text-8xl md:text-9xl font-light">
            {temperature.split('°')[0]}
            <span className="text-5xl align-top ml-1">°{units === 'metric' ? 'C' : 'F'}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-8xl mb-2">
            <WeatherIcon />
          </div>
          <p className="text-2xl font-medium capitalize">{weatherCondition.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4">
          <Thermometer className="text-yellow-300" size={24} />
          <div>
            <p className="text-sm opacity-80">Feels Like</p>
            <p className="text-xl font-semibold">{feelsLike}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4">
          <Droplets className="text-blue-300" size={24} />
          <div>
            <p className="text-sm opacity-80">Humidity</p>
            <p className="text-xl font-semibold">{main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4">
          <Wind className="text-gray-300" size={24} />
          <div>
            <p className="text-sm opacity-80">Wind Speed</p>
            <p className="text-xl font-semibold">
              {weatherData.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;