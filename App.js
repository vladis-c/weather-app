import React, { useState } from "react"
import DayCard from "./Days/DayCard"
import "./App.css"
import classes from "./App.module.css"
const api = {
  key: "66886611ba23f324994bdc57be8c66b1",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState([{}])

  function search(event) {
    if (event.key === "Enter") {
      Promise.all([
        fetch(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        ).then((result) => result.json()),
        fetch(
          `${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`
        ).then((result) => result.json()),
      ]).then((queryResult) => {
        setWeather(queryResult)
        setQuery("")
        console.log(queryResult)
      })
    }
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  function dateBuilder(date) {
    let dayOfTheWeek = daysOfTheWeek[date.getDay() - 1]
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return `${dayOfTheWeek} ${day} ${month} ${year}`
  }

  let currentTime = new Date()
  let hoursCurrentTime = currentTime.toUTCString("en-fi", { hour: "2-digit" })
  



  /*VADIMKA! Zdes nado ponyat kak в зависимости от класса,
   что есть в App.module.css, мона менять картинки 4 штуки. чекни классы */
  return (
    <div
      className={
        typeof weather[0].main !== "undefined"
          ? classes.day
          // : weather[1].city.timezone / 3600 + hoursCurrentTime <= 5
          // ? classes.morning
          // : weather[1].city.timezone / 3600 + hoursCurrentTime <= 11
          // ? classes.day
          // : weather[1].city.timezone / 3600 + hoursCurrentTime <= 17
          // ? classes.eve
          // : weather[1].city.timezone / 3600 + hoursCurrentTime <= 23
          // ? classes.night
          : classes.night
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={function (event) {
              setQuery(event.target.value)
            }}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather[0].main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather[0].name}, {weather[0].sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date(weather[1].list[1].dt_txt))}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather[0].main.temp)}°c</div>
              <div className="weather">{weather[0].weather[0].main}</div>
              <div className="weather-desc">
                {weather[0].weather[0].description}
              </div>
              <DayCard
                dayOfTheWeek={new Date(
                  weather[1].list[16].dt_txt
                ).toLocaleString("en-fi", { weekday: "long" })}
                temp={`${Math.round(weather[1].list[8].main.temp)}°c`}
                weather={weather[1].list[8].weather[0].main}
              >
                {" "}
              </DayCard>
              <DayCard
                dayOfTheWeek={new Date(
                  weather[1].list[16].dt_txt
                ).toLocaleString("en-fi", { weekday: "long" })}
                temp={`${Math.round(weather[1].list[16].main.temp)}°c`}
                weather={weather[1].list[16].weather[0].main}
              >
                {" "}
              </DayCard>
              <DayCard
                dayOfTheWeek={new Date(
                  weather[1].list[24].dt_txt
                ).toLocaleString("en-fi", { weekday: "long" })}
                temp={`${Math.round(weather[1].list[24].main.temp)}°c`}
                weather={weather[1].list[24].weather[0].main}
              >
                {" "}
              </DayCard>
              <DayCard
                dayOfTheWeek={new Date(
                  weather[1].list[32].dt_txt
                ).toLocaleString("en-fi", { weekday: "long" })}
                temp={`${Math.round(weather[1].list[32].main.temp)}°c`}
                weather={weather[1].list[32].weather[0].main}
              >
                {" "}
              </DayCard>
              <DayCard
                dayOfTheWeek={new Date(
                  weather[1].list[39].dt_txt
                ).toLocaleString("en-fi", { weekday: "long" })}
                temp={`${Math.round(weather[1].list[39].main.temp)}°c`}
                weather={weather[1].list[39].weather[0].main}
              >
                {" "}
              </DayCard>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  )
}

export default App
