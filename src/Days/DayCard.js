import React from "react"

import classes from "./DayCard.module.css"

function DayCard(props) {
  return (
    <div className={classes.dayCard}>
      <div className={classes.day}>{props.dayOfTheWeek}</div>
      <div className={classes.temp}>{props.temp}</div>
      <div className={classes.weather}>{props.weather}</div>
    </div>
  )
}

export default DayCard
