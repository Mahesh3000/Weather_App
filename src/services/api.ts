import axios from "axios";
import { Coordinates, Units } from "../types";

const API_URL =
  import.meta.env.VITE_API_URL || "https://weatherapi.maheshsivangi.tech";

interface FetchParams {
  coords?: Coordinates | null;
  city?: string;
  units?: Units;
}

/**
 * Fetch current weather data
 */
export const fetchCurrentWeather = async ({
  coords,
  city,
  units = "metric",
}: FetchParams) => {
  try {
    let params = { units };

    if (coords) {
      params = { ...params, lat: coords.lat, lon: coords.lon };
    } else if (city) {
      params = { ...params, city };
    }

    const response = await axios.get(`${API_URL}/api/weather`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

/**
 * Fetch forecast data
 */
export const fetchForecast = async ({
  coords,
  city,
  units = "metric",
}: FetchParams) => {
  try {
    let params = { units };

    if (coords) {
      params = { ...params, lat: coords.lat, lon: coords.lon };
    } else if (city) {
      params = { ...params, city };
    }

    const response = await axios.get(`${API_URL}/api/forecast`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

/**
 * Search for locations
 */
export const searchLocations = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/locations`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};
