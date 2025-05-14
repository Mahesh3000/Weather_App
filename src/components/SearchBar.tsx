import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchLocations } from '../services/api';
import { Location } from '../types';

interface SearchBarProps {
  onLocationSelect: (location: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }
    
    setLoading(true);
    setShowResults(true);
    
    try {
      const locations = await searchLocations(value);
      setResults(locations);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  };
  
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setQuery('');
          setShowResults(false);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };
  
  const handleSelectLocation = (location: Location) => {
    onLocationSelect(location);
    setQuery(location.name);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search for a city..."
          className="w-full bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-white placeholder-opacity-70 rounded-full py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={18} />
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button 
              onClick={handleClear}
              className="text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>
          )}
          <button 
            onClick={handleUseCurrentLocation}
            className="text-white opacity-70 hover:opacity-100 transition-opacity"
            title="Use current location"
          >
            <MapPin size={18} />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showResults && (
          <motion.div 
            className="absolute mt-2 w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <div className="p-4 text-white text-center">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {results.map((location, index) => (
                  <div
                    key={`${location.name}-${location.lat}-${location.lon}`}
                    onClick={() => handleSelectLocation(location)}
                    className="p-4 hover:bg-white hover:bg-opacity-20 cursor-pointer text-white transition-colors border-b border-white border-opacity-10 last:border-0"
                  >
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 opacity-70" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm opacity-70">
                          {location.state ? `${location.state}, ` : ''}{location.country}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : query.length >= 3 ? (
              <div className="p-4 text-white text-center">
                No locations found
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;