import React from "react";
import ReactDOM from "react-dom";
import WeatherDisplay from "./WeatherDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = {
    lat: null,
    log: null,
    errorMessage: "",
    city: "",
    temperature: null,
    weather: "",
    isFetched: false,
    lastUpdated: 0,
  };

  componentDidMount() {
    //Getting current coordinates.
    window.navigator.geolocation.getCurrentPosition(
      (lat) =>
        this.setState({
          ...this.state,
          lat: lat.coords.latitude,
          log: lat.coords.longitude,
        }),
      (err) => this.setState({ errorMessage: err.message })
    );
    console.log("exc");

    //update weather for every 10 min.
    setInterval(() => {
      this.fetchData();
      this.setState({ ...this, lastUpdated: 0 });
    }, 600000);

    //refresh last updated status for every 1 min interval.
    var refreshId = setInterval(() => {
      this.setState({ ...this, lastUpdated: this.state.lastUpdated + 1 });
    }, 60000);
  }

  fetchData() {
    //Fetching the Weather Data.
    this.setState({ ...this, isFetched: true });
    console.log("inside");
    const key = "03c33989872334afce3c572b484ae129";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      this.state.lat +
      "&lon=" +
      this.state.log +
      "&appid=" +
      key +
      "&units=metric";
    fetch(url)
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then((data) => {
        console.log(data);
        return this.setState({
          ...this.state,
          city: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].main,
        });
      })
      .catch(function (err) {
        // catch any errors
        console.log(err);
        // this.setState({ errorMessage: err });
      });
  }

  loadDisplay() {
    if (this.state.errorMessage)
      return (
        <div>
          <Spinner message="Please Accept the Location Services..." />
        </div>
      );
    if (this.state.lat && this.state.log && !this.state.errorMessage)
      return (
        <div>
          {!this.state.isFetched ? this.fetchData() : null}
          <WeatherDisplay
            city={this.state.city}
            weather={this.state.weather}
            temperature={this.state.temperature}
            lat={this.state.lat}
            lastUpdated={this.state.lastUpdated}
          />
        </div>
      );
    return (
      <div>
        <Spinner message="Loading..." />
      </div>
    );
  }

  render() {
    return <div>{this.loadDisplay()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
