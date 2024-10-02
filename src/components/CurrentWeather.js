import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

export default function CurrentWeather({ currentWeather, cityName }) {
  if (!currentWeather) {
    return <div>No weather data available</div>; // Handle case when no data
  }

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <WiCloudy className="text-gray-400 text-6xl" />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <WiRain className="text-blue-400 text-6xl" />;
      case '11d':
      case '11n':
        return <WiThunderstorm className="text-purple-400 text-6xl" />;
      case '13d':
      case '13n':
        return <WiSnow className="text-white text-6xl" />;
      case '50d':
      case '50n':
        return <WiFog className="text-gray-300 text-6xl" />;
      default:
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="text-6xl">
        {getWeatherIcon(currentWeather.weather[0].icon)}
      </div>
      <div className="text-right">
        <p className="text-5xl font-bold">{Math.round(currentWeather.main.temp)}°C</p>
        <p className="text-black-300 text-lg">{currentWeather.weather[0].description}</p>
        <p className="text-black-300 text-lg">{cityName}</p> {/* Display city name */}
      </div>
    </div>
  );
}
