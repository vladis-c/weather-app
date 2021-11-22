import React, { useEffect, useState } from "react";
import DayCard from "./Days/DayCard";
import "./App.css";
import classes from "./App.module.css";
const api = {
  key: "66886611ba23f324994bdc57be8c66b1",
  base: "https://api.openweathermap.org/data/2.5/",
};

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
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
];

function doDate(date) {
  let dayOfTheWeek = daysOfTheWeek[date.getDay() - 1];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  return `Today is ${dayOfTheWeek} ${day} ${month} ${year} ${(
    "0" + hours
  ).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([{}]);
  const [clockState, setClockState] = useState();
  const [timezone, setTimezone] = useState(0);
  const [currentDate, setCurrentDate] = useState(
    new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000)
  );

  useEffect(() => {
    setCurrentDate(
      new Date(
        Date.now() + (timezone + new Date().getTimezoneOffset() * 60) * 1000
      )
    );
  }, [timezone]);

  useEffect(() => {
    const date = doDate(currentDate);
    setClockState(date);
  }, [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date(currentDate.getTime() + 1000));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentDate, setCurrentDate]);

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
        setWeather(queryResult);
        setQuery("");
        console.log(queryResult);
        setTimezone(queryResult[1]?.city?.timezone ?? 0);
      });
    }
  }
  const time = currentDate.getHours();

  let className = null;

  if (time >= 6 && time <= 11) {
    className = classes.morning;
  } else if (time >= 12 && time <= 16) {
    className = classes.day;
  } else if (time >= 17 && time <= 22) {
    className = classes.eve;
  } else if (time >= 23 || time <= 5) {
    className = classes.night;
  }

  return (
    <div className={className}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={function (event) {
              setQuery(event.target.value);
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
              <div className="date">{clockState}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather[0].main.temp)}°c</div>
              <div className="weather">{weather[0].weather[0].main}</div>
              <div className="weather-desc">
                {weather[0].weather[0].description}
              </div>
              <DayCard
                dayOfTheWeek={new Date(
                  weather[1].list[8].dt_txt
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
  );
}

export default App;
