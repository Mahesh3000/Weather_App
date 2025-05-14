import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  Cloudy, 
  CloudDrizzle
} from 'lucide-react';
import { Units } from '../types';

/**
 * Get the appropriate weather icon based on the weather condition
 */
export const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'Clear':
      return Sun;
    case 'Clouds':
      return Cloudy;
    case 'Rain':
      return CloudRain;
    case 'Drizzle':
      return CloudDrizzle;
    case 'Thunderstorm':
      return CloudLightning;
    case 'Snow':
      return CloudSnow;
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
      return CloudFog;
    default:
      return Cloud;
  }
};

/**
 * Format temperature based on units
 */
export const formatTemperature = (temp: number, units: Units): string => {
  return `${Math.round(temp)}°${units === 'metric' ? 'C' : 'F'}`;
};

/**
 * Get background style based on weather condition and time of day
 */
export const getWeatherBackground = (condition: string, isNight: boolean) => {
  let style = {
    background: 'linear-gradient(to bottom right, #3498db, #2980b9)'
  };
  
  if (isNight) {
    // Night backgrounds
    switch (condition) {
      case 'Clear':
        style.background = 'linear-gradient(to bottom right, #1a237e, #000000)';
        break;
      case 'Clouds':
        style.background = 'linear-gradient(to bottom right, #37474f, #263238)';
        break;
      case 'Rain':
      case 'Drizzle':
        style.background = 'linear-gradient(to bottom right, #1a237e, #01579b)';
        break;
      case 'Thunderstorm':
        style.background = 'linear-gradient(to bottom right, #263238, #000000)';
        break;
      case 'Snow':
        style.background = 'linear-gradient(to bottom right, #455a64, #546e7a)';
        break;
      case 'Mist':
      case 'Fog':
        style.background = 'linear-gradient(to bottom right, #37474f, #455a64)';
        break;
      default:
        style.background = 'linear-gradient(to bottom right, #1a237e, #000000)';
    }
  } else {
    // Day backgrounds
    switch (condition) {
      case 'Clear':
        style.background = 'linear-gradient(to bottom right, #2196f3, #03a9f4)';
        break;
      case 'Clouds':
        style.background = 'linear-gradient(to bottom right, #78909c, #607d8b)';
        break;
      case 'Rain':
      case 'Drizzle':
        style.background = 'linear-gradient(to bottom right, #546e7a, #37474f)';
        break;
      case 'Thunderstorm':
        style.background = 'linear-gradient(to bottom right, #455a64, #263238)';
        break;
      case 'Snow':
        style.background = 'linear-gradient(to bottom right, #eceff1, #cfd8dc)';
        break;
      case 'Mist':
      case 'Fog':
        style.background = 'linear-gradient(to bottom right, #b0bec5, #90a4ae)';
        break;
      default:
        style.background = 'linear-gradient(to bottom right, #2196f3, #03a9f4)';
    }
  }
  
  return style;
};