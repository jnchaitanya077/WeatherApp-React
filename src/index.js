import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = { lat: null, log: null, errorMessage: "" };

  componentDidMount() {
    //Getting current coordinates.
    console.log(
      window.navigator.geolocation.getCurrentPosition(
        (lat) =>
          this.setState({
            lat: lat.coords.latitude,
            log: lat.coords.longitude,
            city: "",
            temperature: null,
          }),
        (err) => this.setState({ errorMessage: err.message })
      )
    );
  }

  fetchData() {
    //Fetching the Weather Data.
    const key = "0553db3363521486ac3885e55b7730fd";
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
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        // catch any errors
        console.log(err);
        this.setState({ errorMessage: err });
      });
  }

  loadDisplay() {
    if (this.state.errorMessage)
      return <div>Error: {this.state.errorMessage}</div>;
    if (this.state.lat && this.state.log && !this.state.errorMessage)
      return (
        <div>
          {this.fetchData()}
          lat:{this.state.lat}
          <br />
          log:{this.state.log}
          <br />
        </div>
      );
    return <div>Loading...</div>;
  }

  render() {
    return <div>{this.loadDisplay()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
