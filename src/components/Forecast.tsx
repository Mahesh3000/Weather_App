import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData, Units } from '../types';
import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils';

interface ForecastProps {
  forecastData: ForecastData;
  units: Units;
}

const Forecast: React.FC<ForecastProps> = ({ forecastData, units }) => {
  // Take only 5 days
  const dailyForecasts = forecastData.dailyForecasts.slice(0, 5);
  
  return (
    <motion.div 
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h2>
      
      <div className="space-y-4">
        {dailyForecasts.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.weather.main);
          const minTemp = formatTemperature(day.temps.min, units);
          const maxTemp = formatTemperature(day.temps.max, units);
          
          // Animation delay for staggered appearance
          const delay = 0.4 + (index * 0.1);
          
          return (
            <motion.div 
              key={day.date} 
              className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-xl text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay }}
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">
                  <WeatherIcon />
                </div>
                <div>
                  <p className="font-medium">{index === 0 ? 'Today' : day.day}</p>
                  <p className="text-sm text-white text-opacity-80 capitalize">{day.weather.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className="font-bold">{maxTemp}</span>
                <span className="mx-2 opacity-50">|</span>
                <span className="opacity-80">{minTemp}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Forecast;