import { useState } from 'react'
import './App.css'

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

      const locationResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city.trim()}&limit=1&appid=${API_KEY}`
      )

      const locationData = await locationResponse.json()

      console.log('Location Data:', locationData)

      if (!locationResponse.ok) {
        setError(locationData.message || 'Location API error')
        return
      }

      if (locationData.length === 0) {
        setError('City not found')
        return
      }

      const location = locationData[0]

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      )

      const weatherData = await weatherResponse.json()

      console.log('Weather Data:', weatherData)

      if (!weatherResponse.ok) {
        setError(weatherData.message || 'Weather API error')
        return
      }

      
      setWeather({
        city: location.name,
        country: location.country,
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
      })
    } catch (error) {
      console.log('Error:', error)
      setError('Unable to get weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={fetchWeather}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {error && (
        <p className="error">
          {error}
        </p>
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