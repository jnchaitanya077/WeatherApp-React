import React from "react";
import "./WeatherDispay.css";
import Time from "./Time";

const GetSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? "Summer" : "Winter";
  } else {
    return lat > 0 ? "Winter" : "Summer";
  }
};

const Greetings = (hours) => {
  if (hours >= 3 && hours < 11) return "Good Morning";
  if (hours >= 11 && hours < 15) return "Good AfterNoon";
  if (hours >= 15 && hours < 18) return "Good Evening";
  if (hours >= 18 && hours < 23) return "Good Night";
  else return "Sleep Well";
};

const WeatherDispaly = (params) => {
  const season = GetSeason(params.lat, new Date().getMonth());
  console.log(new Date().getHours());
  const Greet = Greetings(new Date().getHours());

  return (
    <div className={`weather-display ${season} ${Greet}`}>
      <Time />
      <div className="main-body">
        <h1 className="centre">{Greet}!!</h1>
        <h2 className="centre">
          {params.city}({season})
        </h2>
        <h3 className="centre" style={{ paddingBottom: "25px" }}>
          {params.weather}, <i className="cloud icon"></i> {params.temperature}
          {"\u00b0"}C
        </h3>
        <h3>
          <i className="sync icon"></i> Last updated 23 minutes ago
        </h3>
      </div>
    </div>
  );
};

export default WeatherDispaly;
