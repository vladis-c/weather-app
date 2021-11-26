import React from "react"
import "./WeatherCard.css"

function WeatherCard(props) {
  return (
    <div>
      <div className="location-box">
        <div className="location">{props.location}</div>
        <div className="local-time">{`Local time in ${props.city} is:`}</div>
        <div className="local-time">{props.localTime}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{props.temp}°c</div>
        <div className="weather-short-desc">{props.weatherShortDesc}</div>
        <div className="weather-long-desc">{props.weatherLongDesc}</div>
      </div>
    </div>
  )
}

export default WeatherCard
