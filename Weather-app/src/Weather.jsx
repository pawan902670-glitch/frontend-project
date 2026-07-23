import { useState } from 'react'
import axios from 'axios'
import './App.css';

export default function Weather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const API_KEY = '0f470929d6b415fafb83c181aa382339'

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    try {
      setLoading(true)
      setError('')
      setWeather(null)

      const locationResponse = await axios.get(
        'https://api.openweathermap.org/geo/1.0/direct',
        {
          params: {
            q: city.trim(),
            limit: 1,
            appid: API_KEY,
          },
        }
      )

      if (locationResponse.data.length === 0) {
        setError('City not found')
        return
      }

      const { lat, lon, name, country } = locationResponse.data[0]

      const weatherResponse = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      )

      console.log('Weather Data:', weatherResponse.data)

      setWeather({
        city: name,
        country: country,
        temperature: weatherResponse.data.main.temp,
        feelsLike: weatherResponse.data.main.feels_like,
        humidity: weatherResponse.data.main.humidity,
        description: weatherResponse.data.weather[0].description,
        windSpeed: weatherResponse.data.wind.speed,
      })
    } catch (error) {
      console.error('Error:', error.response?.data || error.message)

      if (error.response?.status === 401) {
        setError('Invalid API key')
      } else {
        setError('Weather data fetch nahi ho saka')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather()
    }
  }

  return (
    <div className="container">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
      />

      <button onClick={fetchWeather} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {error && (
        <p>{error}</p>
      )}

      {weather && (
        <div className="weather">
          <h2>
            {weather.city}, {weather.country}
          </h2>

          <h3>
            {weather.temperature}°C
          </h3>

          <p>
            Feels Like: {weather.feelsLike}°C
          </p>

          <p>
            Humidity: {weather.humidity}%
          </p>

          <p>
            Condition: {weather.description}
          </p>

          <p>
            Wind Speed: {weather.windSpeed} m/s
          </p>
        </div>
      )}
    </div>
  )
}
