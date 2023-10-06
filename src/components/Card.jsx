import { useEffect, useState } from "react"
import search from '../../images/search.png'

export default function Card() {


  const [searchCity, setSearchCity] = useState()
  const [weather, setWeather] = useState(false)

  let getWeather = async () => {
    const apiKey = 'dd6fe11e7a1d601d9fdc23be93368672'
    console.log('Chamando a API...')
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&lang=pt_br&units=metric`)
    console.log('API chamada com sucesso!')
    const data = await response.json()
    setWeather(data)
  }


  useEffect(() => {
    getWeather().then(res => setWeather(res))
  }, [])



  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log(weather)
    getWeather()
  }

  const handleChange = (e) => {
    setSearchCity(e.target.value)
  }


  return (
    <div className="card-container">
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search"></label>
          <input type="text" name="search" id="search" value={searchCity} onChange={handleChange} placeholder="search city" />
          <button type="submit"><img src={search} alt="" /></button>
        </form>
        <div className="info-content">
          {weather && weather.main && (
            <>
              <h1>{searchCity}</h1>

              <div className="weather">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
                <h1>{weather.main.temp && Math.floor(weather.main.temp)}°C</h1>
              </div>
              <p>{weather.weather[0].description}</p>
            </>
          )}
        </div>
      </div >
    </div>
  )
}

