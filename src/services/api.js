import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://backend.maheshsivangi.tech/" ||
  "http://localhost:3000";

export const fetchCurrentWeather = async ({
  coords,
  city,
  units = "metric",
}) => {
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

export const fetchForecast = async ({ coords, city, units = "metric" }) => {
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

export const searchLocations = async (query) => {
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
