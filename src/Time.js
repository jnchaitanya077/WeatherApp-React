import React from "react";

class Time extends React.Component {
  state = { time: new Date().toLocaleTimeString() };

  componentDidMount() {
    let timerId = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }

  render() {
    return (
      <div>
        <h2>{this.state.time}</h2>
      </div>
    );
  }
}

export default Time;
