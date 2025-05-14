import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';
import { fetchCurrentWeather, fetchForecast } from './services/api';
import { getWeatherBackground } from './utils/weatherUtils';
import { WeatherData, Coordinates, Units } from './types';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<string>('');
  const [units, setUnits] = useState<Units>('metric');

  // Get current location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to a popular city if geolocation fails
          setSearchedLocation('New York');
        }
      );
    } else {
      // Geolocation not supported
      setSearchedLocation('New York');
    }
  }, []);

  // Current weather query
  const { 
    data: weatherData, 
    isLoading: weatherLoading, 
    error: weatherError 
  } = useQuery(
    ['currentWeather', coords?.lat, coords?.lon, searchedLocation, units],
    () => fetchCurrentWeather({ coords, city: searchedLocation, units }),
    {
      enabled: !!coords || !!searchedLocation,
      refetchOnWindowFocus: false
    }
  );

  // Forecast query
  const { 
    data: forecastData, 
    isLoading: forecastLoading, 
    error: forecastError 
  } = useQuery(
    ['forecast', coords?.lat, coords?.lon, searchedLocation, units],
    () => fetchForecast({ coords, city: searchedLocation, units }),
    {
      enabled: !!coords || !!searchedLocation,
      refetchOnWindowFocus: false
    }
  );

  const handleLocationSelect = (location: any) => {
    if (location.lat && location.lon) {
      setCoords({ lat: location.lat, lon: location.lon });
      setSearchedLocation('');
    } else if (location.name) {
      setSearchedLocation(location.name);
      setCoords(null);
    }
  };

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const isLoading = weatherLoading || forecastLoading;
  const hasError = weatherError || forecastError;
  const weatherCondition = weatherData?.weather[0]?.main || 'Clear';
  const isNight = weatherData ? 
    new Date().getHours() < 6 || new Date().getHours() > 18 : 
    false;

  const backgroundStyle = getWeatherBackground(weatherCondition, isNight);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <ErrorDisplay message="Failed to load weather data. Please try again." />;
  }

  return (
    <div 
      className="min-h-screen flex flex-col transition-all duration-1000 ease-in-out"
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header className="mb-8">
          <SearchBar onLocationSelect={handleLocationSelect} />
        </header>
        
        <main className="flex-1 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 lg:w-3/5">
            {weatherData && (
              <WeatherDisplay 
                weatherData={weatherData} 
                units={units} 
                onToggleUnits={toggleUnits} 
              />
            )}
          </div>
          
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-8">
            {weatherData && (
              <WeatherDetails 
                weatherData={weatherData}
                units={units}
              />
            )}
            
            {forecastData && (
              <Forecast 
                forecastData={forecastData} 
                units={units}
              />
            )}
          </div>
        </main>
        
        <footer className="mt-auto pt-8 text-center text-white text-opacity-70 text-sm">
          <p>© 2025 Weather App | Data provided by OpenWeather</p>
        </footer>
      </div>
    </div>
  );
}

export default App;