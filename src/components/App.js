import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

class App extends Component {
  state = {
    city: "",
    cityFormAPI: "",
    country: "",
    countryCode: "",
    countryFlag: "",
    date: "",
    sunrise: "",
    sunset: "",
    temp: "",
    wind: "",
    pressure: "",
    desc: "",
    icon: "",
    err: ""
  };
  inputHandle = e => {
    const city = e.target.value;
    this.setState({
      city
    });
  };
  buttonHandle = e => {
    e.preventDefault();
    const city = this.state.city;
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9101796ad97e0305f715b89426e1aa9f`;
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Weather not found");
      })
      .then(response => response.json())
      .then(response => {
        const date = new Date(response.dt * 1000).toLocaleDateString();
        const sunrise = new Date(
          response.sys.sunrise * 1000
        ).toLocaleTimeString();
        const sunset = new Date(
          response.sys.sunset * 1000
        ).toLocaleTimeString();
        this.setState({
          date: date,
          cityFromAPI: response.name,
          countryCode: response.sys.country,
          country: "",
          countryFlag: "",
          sunrise: sunrise,
          sunset: sunset,
          temp: response.main.temp,
          wind: response.wind.speed,
          pressure: response.main.pressure,
          desc: response.weather[0]["description"],
          icon: response.weather[0]["icon"],
          err: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          err: true
        });
      });
  };
  fetchCountryName = () => {
    const countryCode = this.state.countryCode;
    const API2 = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    fetch(API2)
      .then(response => {
        if (response.ok) {
          return response;
        }
        this.setState({
          country: countryCode
        });
      })
      .then(response => response.json())
      .then(response =>
        this.setState({
          country: response.nativeName,
          countryFlag: response.flag
        })
      );
  };
  render() {
    return (
      <div className="app">
        <h1>Weather app</h1>
        <Form
          inputHandle={this.inputHandle}
          text={this.state.city}
          buttonHandle={this.buttonHandle}
        />
        <Result weather={this.state} fetchCountryName={this.fetchCountryName} />
      </div>
    );
  }
}

export default App;
