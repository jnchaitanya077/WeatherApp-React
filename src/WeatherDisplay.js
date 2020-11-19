import React from "react";
import "./css/WeatherDispay.css";
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
    <div className={`weather-display ${season} ${Greet} container-fluid`}>
      <Time />
      <div className="container main-body shadow-lg p-3 mb-5 rounded">
        <h1 className="centre">{Greet}!!</h1>
        <h4 className="centre">
          {params.city}({season})
        </h4>
        <h5 className="centre" style={{ paddingBottom: "25px" }}>
          {params.weather}, <i class="fas fa-cloud"></i> {params.temperature}
          {"\u00b0"}C
        </h5>
        <h6>
          <i class="fas fa-sync"></i> Last updated {params.lastUpdated} minutes
          ago
        </h6>
      </div>
    </div>
  );
};

export default WeatherDispaly;
