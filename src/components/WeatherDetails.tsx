import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sunrise, 
  Sunset, 
  Eye, 
  Gauge, 
  Cloud 
} from 'lucide-react';
import { WeatherData, Units } from '../types';

interface WeatherDetailsProps {
  weatherData: WeatherData;
  units: Units;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData, units }) => {
  const { main, visibility, clouds, sys } = weatherData;
  
  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const sunrise = formatTime(sys.sunrise);
  const sunset = formatTime(sys.sunset);
  
  // Visibility in km or miles
  const visibilityDistance = units === 'metric' 
    ? `${(visibility / 1000).toFixed(1)} km`
    : `${(visibility / 1609).toFixed(1)} mi`;

  return (
    <motion.div 
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-6 shadow-lg text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6">Weather Details</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center">
          <Sunrise className="text-yellow-300 mr-3" size={24} />
          <div>
            <p className="text-sm opacity-80">Sunrise</p>
            <p className="text-lg font-medium">{sunrise}</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center">
          <Sunset className="text-orange-400 mr-3" size={24} />
          <div>
            <p className="text-sm opacity-80">Sunset</p>
            <p className="text-lg font-medium">{sunset}</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center">
          <Eye className="text-blue-200 mr-3" size={24} />
          <div>
            <p className="text-sm opacity-80">Visibility</p>
            <p className="text-lg font-medium">{visibilityDistance}</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-xl p-4 flex items-center">
          <Gauge className="text-red-300 mr-3" size={24} />
          <div>
            <p className="text-sm opacity-80">Pressure</p>
            <p className="text-lg font-medium">{main.pressure} hPa</p>
          </div>
        </div>
        
        <div className="col-span-2 bg-white bg-opacity-10 rounded-xl p-4 flex items-center">
          <Cloud className="text-white mr-3" size={24} />
          <div>
            <p className="text-sm opacity-80">Cloudiness</p>
            <p className="text-lg font-medium">{clouds.all}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDetails;