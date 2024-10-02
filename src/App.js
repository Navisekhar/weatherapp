import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import TemperatureChart from './components/TemperatureChart';
import Forecast from './components/Forecast';
import Search from './components/Search'; // Import the Search component

const API_KEY = 'efaba86889b0f428ccd95fa2b59e04e3'; // Replace with your OpenWeatherMap API key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New state to hold the location
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      if (location.lat && location.lon) {
        await fetchWeatherData(location.lat, location.lon);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (err) => {
            setError("Unable to retrieve your location. Please allow location access.");
            setLoading(false);
          }
        );
      }
    };

    fetchCurrentLocationWeather();
  }, [location]);

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true); // Set loading before fetch
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (err) {
      setError("Error fetching weather data");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  // New function to handle search
  const handleSearch = async (city) => {
    if (!city) {
      setError("Please enter a city name.");
      return; // Prevent empty search
    }

    setLoading(true); // Set loading before fetch
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Error fetching weather data for the searched city. Please check the city name.");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!weatherData) return null;

  const currentWeather = weatherData.list[0];
  const fiveDayForecast = weatherData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
  const chartData = weatherData.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: item.main.temp
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <Search onSearch={handleSearch} /> {/* Add the Search component */}
      <CurrentWeather currentWeather={currentWeather} cityName={weatherData.city.name} />
      <TemperatureChart chartData={chartData} />
      <Forecast fiveDayForecast={fiveDayForecast} />
    </div>
  );
}

export default App;
