import React from 'react'
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'

export default function Forecast({ fiveDayForecast }) {
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return <WiDaySunny className="text-yellow-400 text-4xl" />
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <WiCloudy className="text-gray-400 text-4xl" />
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <WiRain className="text-blue-400 text-4xl" />
      case '11d':
      case '11n':
        return <WiThunderstorm className="text-purple-400 text-4xl" />
      case '13d':
      case '13n':
        return <WiSnow className="text-white text-4xl" />
      case '50d':
      case '50n':
        return <WiFog className="text-gray-300 text-4xl" />
      default:
        return <WiDaySunny className="text-yellow-400 text-4xl" />
    }
  }

  return (
    <div className="grid grid-cols-2 text-white md:grid-cols-5 gap-4">
      {fiveDayForecast.map((day, index) => (
        <div key={index} className="text-center p-4 bg-blue-500 rounded-lg shadow-md">
          <p className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}</p>
          <div className="text-4xl my-2">
            {getWeatherIcon(day.weather[0].icon)}
          </div>
          <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
        </div>
      ))}
    </div>
  )
}
