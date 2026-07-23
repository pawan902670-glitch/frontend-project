Bilkul. Main tumhare **complete Weather App code** ko ekdum **beginner-friendly connecting flow** mein explain karta hoon, taaki koi bhi code padhe to samajh sake ki **Input se lekar API se weather data aane aur screen par show hone tak** kya ho raha hai.

## 1. Complete Code

```jsx
import { useState } from 'react'
import './App.css'

export default function Weather() {
  // User ke input ke liye
  const [city, setCity] = useState('')

  // Weather data store karne ke liye
  const [weather, setWeather] = useState(null)

  // Error message store karne ke liye
  const [error, setError] = useState('')

  // Loading status ke liye
  const [loading, setLoading] = useState(false)

  // OpenWeather API key
  const API_KEY = 'YOUR_API_KEY'

  // Weather fetch karne ka main function
  const fetchWeather = async () => {
    // Agar user ne city nahi dali
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    try {
      // Loading start
      setLoading(true)

      // Purana error hatao
      setError('')

      // Purana weather data hatao
      setWeather(null)

      // =================================
      // STEP 1: CITY KI LOCATION FIND KARNA
      // =================================

      const locationResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city.trim()}&limit=1&appid=${API_KEY}`
      )

      // API response ko JSON mein convert karna
      const locationData = await locationResponse.json()

      // Agar city nahi mili
      if (locationData.length === 0) {
        setError('City not found')
        return
      }

      // City ka first result lena
      const location = locationData[0]

      // =================================
      // STEP 2: LATITUDE AUR LONGITUDE LENA
      // =================================

      const lat = location.lat
      const lon = location.lon

      // =================================
      // STEP 3: WEATHER DATA FETCH KARNA
      // =================================

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )

      // Weather response ko JSON mein convert karna
      const weatherData = await weatherResponse.json()

      // =================================
      // STEP 4: WEATHER DATA STATE MEIN SAVE
      // =================================

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
      // Agar API request fail ho jaye
      console.log(error)

      setError('Unable to get weather data')
    } finally {
      // Loading stop
      setLoading(false)
    }
  }

  return (
    <div className="container">

      <h1>Weather App</h1>

      {/* =================================
          STEP 5: USER CITY INPUT
          ================================= */}

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* =================================
          STEP 6: BUTTON
          ================================= */}

      <button
        onClick={fetchWeather}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {/* =================================
          STEP 7: ERROR DISPLAY
          ================================= */}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* =================================
          STEP 8: WEATHER DISPLAY
          ================================= */}

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
```

---

# 2. Sabse Pehle React Component Start Hota Hai

```jsx
export default function Weather() {
```

Ye tumhara **React functional component** hai.

React is component ko browser par render karega.

Iske andar 2 main parts hain:

```text
Weather Component
       │
       ├── Logic
       │     ├── useState
       │     ├── fetchWeather()
       │     └── API calls
       │
       └── UI
             ├── Input
             ├── Button
             ├── Error
             └── Weather Data
```

---

# 3. `useState` Ka Role

Tumhare paas 4 states hain:

```jsx
const [city, setCity] = useState('')
```

Ye user ki input value store karta hai.

Starting value:

```text
city = ''
```

Jab user `"Lucknow"` type karega:

```text
city = "Lucknow"
```

---

Dusra:

```jsx
const [weather, setWeather] = useState(null)
```

Ye API se aane wala weather data store karega.

Starting mein:

```text
weather = null
```

Weather milne ke baad:

```text
weather = {
  city: "Lucknow",
  temperature: 32,
  humidity: 60
}
```

---

Teesra:

```jsx
const [error, setError] = useState('')
```

Agar koi error aaye to yahan store hoga:

```text
error = "City not found"
```

---

Chautha:

```jsx
const [loading, setLoading] = useState(false)
```

API request ke time:

```text
loading = true
```

API request complete hone ke baad:

```text
loading = false
```

---

# 4. User City Enter Karta Hai

HTML:

```jsx
<input
  type="text"
  placeholder="Enter city name"
  value={city}
  onChange={(e) => setCity(e.target.value)}
/>
```

Yahan:

```jsx
value={city}
```

Input ki value ko React state se connect karta hai.

Aur:

```jsx
onChange={(e) => setCity(e.target.value)}
```

User jo type karta hai, woh `city` state mein save hota hai.

Example:

```text
User types:
Lucknow

        ↓

e.target.value

        ↓

setCity("Lucknow")

        ↓

city = "Lucknow"
```

Isko **controlled input** kehte hain.

---

# 5. User Button Click Karta Hai

Button:

```jsx
<button onClick={fetchWeather}>
  Get Weather
</button>
```

Jab user button click karta hai:

```text
Click
  ↓
onClick
  ↓
fetchWeather()
```

Ab `fetchWeather()` function execute hota hai.

---

# 6. Pehle Check Hota Hai City Empty To Nahi

```jsx
if (!city.trim()) {
  setError('Please enter a city name')
  return
}
```

Agar user kuch nahi likhta:

```text
city = ""
```

to error show hoga:

```text
Please enter a city name
```

`return` ka matlab:

> Yahin function ko stop kar do.

API call nahi hogi.

---

# 7. `try` Block Start Hota Hai

```jsx
try {
```

Iske andar hum API call karte hain.

Agar API call mein problem aaye, to:

```jsx
catch
```

execute hoga.

---

# 8. Loading Start

```jsx
setLoading(true)
```

Ab:

```text
loading = true
```

Button:

```jsx
{loading ? 'Loading...' : 'Get Weather'}
```

Ab screen par:

```text
Loading...
```

show hoga.

---

# 9. Pehla `fetch()` — City Ki Location

Ab important part:

```jsx
const locationResponse = await fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${city.trim()}&limit=1&appid=${API_KEY}`
)
```

Yahan hum OpenWeather ki **Geocoding API** call kar rahe hain.

Is API ka kaam:

```text
City Name
    ↓
Latitude + Longitude
```

Example:

```text
Lucknow
    ↓
lat = 26.8467
lon = 80.9462
```

### `q` kya hai?

```text
q=Lucknow
```

Matlab:

> Mujhe Lucknow ki location do.

### `limit=1`

Matlab:

> Sirf ek result do.

### `appid`

Matlab:

> Ye meri API key hai.

---

# 10. Response Ko JSON Mein Convert Karna

```jsx
const locationData = await locationResponse.json()
```

`fetch()` se response directly JavaScript object nahi milta.

Isliye:

```jsx
.json()
```

use karte hain.

Ab API ka response JavaScript data ban jata hai.

Example:

```js
[
  {
    name: "Lucknow",
    lat: 26.8467,
    lon: 80.9462,
    country: "IN"
  }
]
```

---

# 11. City Check Karna

```jsx
if (locationData.length === 0) {
  setError('City not found')
  return
}
```

Agar API ne empty array diya:

```js
[]
```

to matlab city nahi mili.

Error:

```text
City not found
```

---

# 12. City Ka Data Lena

```jsx
const location = locationData[0]
```

API ne array diya:

```js
[
  {
    name: "Lucknow",
    lat: 26.8467,
    lon: 80.9462
  }
]
```

`[0]` ka matlab:

> Array ka first object lo.

Ab:

```js
location
```

ke andar:

```text
name
lat
lon
country
```

hai.

---

# 13. Latitude Aur Longitude Nikalna

```jsx
const lat = location.lat
const lon = location.lon
```

Ab:

```text
lat = 26.8467
lon = 80.9462
```

Mil gaya.

Ab hum next API call kar sakte hain.

---

# 14. Dusra `fetch()` — Weather Data

```jsx
const weatherResponse = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
)
```

Ye **Weather API** hai.

Isko hum bhejte hain:

```text
Latitude
Longitude
API Key
Units
```

Ab API actual weather information return karti hai:

```text
Temperature
Feels Like
Humidity
Condition
Wind Speed
```

Isliye 2 fetch hain:

```text
1st fetch
City → Location

2nd fetch
Location → Weather
```

---

# 15. Weather Response Ko JSON Mein Convert Karna

```jsx
const weatherData = await weatherResponse.json()
```

Ab weather API ka response JavaScript object ban gaya.

Example:

```js
{
  main: {
    temp: 32,
    feels_like: 34,
    humidity: 60
  },

  weather: [
    {
      description: "clear sky"
    }
  ],

  wind: {
    speed: 3.5
  }
}
```

---

# 16. Weather State Mein Data Save Karna

Ab:

```jsx
setWeather({
  city: location.name,
  country: location.country,
  temperature: weatherData.main.temp,
  feelsLike: weatherData.main.feels_like,
  humidity: weatherData.main.humidity,
  description: weatherData.weather[0].description,
  windSpeed: weatherData.wind.speed,
})
```

Hum API ke bade response mein se sirf required data le rahe hain.

Ab `weather` state kuch aisi ho jayegi:

```js
{
  city: "Lucknow",
  country: "IN",
  temperature: 32,
  feelsLike: 34,
  humidity: 60,
  description: "clear sky",
  windSpeed: 3.5
}
```

---

# 17. React Automatically UI Update Karta Hai

Ab:

```jsx
setWeather(...)
```

hone ke baad React component ko dobara render karta hai.

Pehle:

```text
weather = null
```

Isliye:

```jsx
{weather && (
```

ke andar kuch show nahi hota.

Lekin API data ke baad:

```text
weather = {
  city: "Lucknow",
  temperature: 32
}
```

Ab:

```jsx
{weather && (
  <div className="weather">
```

show hone lagta hai.

---

# 18. Weather Screen Par Kaise Aata Hai?

Ye:

```jsx
<h2>
  {weather.city}, {weather.country}
</h2>
```

show karega:

```text
Lucknow, IN
```

Ye:

```jsx
<h3>
  {weather.temperature}°C
</h3>
```

show karega:

```text
32°C
```

Ye:

```jsx
<p>
  Humidity: {weather.humidity}%
</p>
```

show karega:

```text
Humidity: 60%
```

Aur isi tarah baaki data.

---

# 19. `catch` Ka Role

Agar API call fail ho jaye:

```jsx
catch (error) {
  console.log(error)
  setError('Unable to get weather data')
}
```

To error state update hogi:

```text
error = "Unable to get weather data"
```

Aur ye UI mein show hoga:

```jsx
{error && (
  <p className="error">
    {error}
  </p>
)}
```

---

# 20. `finally` Ka Role

```jsx
finally {
  setLoading(false)
}
```

Chahe API successful ho ya fail:

```text
API Success
    ↓
finally

OR

API Error
    ↓
finally
```

Dono cases mein:

```text
loading = false
```

ho jayega.

Isliye button wapas:

```text
Get Weather
```

dikhaega.

---

# Complete Connection Ek Saath

Ab poora application ek flow mein dekho:

```text
                 REACT WEATHER APP
                        │
                        ▼
                User city enter karta hai
                        │
                        ▼
                city state mein save
                        │
                        ▼
                User button click
                        │
                        ▼
                  fetchWeather()
                        │
                        ▼
               City empty hai kya?
                    /        \
                  YES         NO
                   │           │
                   ▼           ▼
                Error       First fetch()
                               │
                               ▼
                         Geocoding API
                               │
                               ▼
                     Latitude + Longitude
                               │
                               ▼
                         Second fetch()
                               │
                               ▼
                          Weather API
                               │
                               ▼
                    Weather Data Receive
                               │
                               ▼
                       setWeather()
                               │
                               ▼
                    React State Update
                               │
                               ▼
                      Component Re-render
                               │
                               ▼
                      Weather UI Display
```

### Sabse important concept

Tumhare app mein **React ka kaam** hai:

```text
UI + State Management
```

**JavaScript ka kaam** hai:

```text
async/await + fetch
```

**OpenWeather API ka kaam** hai:

```text
Location + Weather Data
```

Aur in teeno ko connect karke tumhara Weather App banta hai:

```text
React
  +
JavaScript Fetch API
  +
OpenWeather API
  =
Weather App
```

Agar tum is code ko samajh rahe ho, to tum **React mein API integration ka ek bahut important beginner-to-intermediate concept** samajh rahe ho.



User: Lucknow
      ↓
1️⃣ Pehle city search
      ↓
Lucknow ki location milti hai
      ↓
Latitude = 26.8467
Longitude = 80.9462
      ↓
2️⃣ Ab latitude + longitude ko Weather API mein bhejte hain
      ↓
Weather API weather data deti hai
      ↓
Temperature
Humidity
Wind Speed
Condition
      ↓
Screen par display