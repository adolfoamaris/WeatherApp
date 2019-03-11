import React, { Component } from "react";
import Location from "./Location";
import WeatherData from "./WeatherData";
import "./styles.css";

import { SUN } from "./../../constants/weathers";

const location = "Bogota,CO";
const api_key = "67eca41b387fb2e6f5f9fcb872be4015";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}`;

const data = {
	temperature: 5,
	weatherState: SUN,
	humidity: 10,
	wind: "10 m/s"
  };

  
class WeatherLocation extends Component {
  constructor() {
    super();
    this.state = {
      city: "Bogotá D.C.",
      data: data
    };
  }

  getweatherState = weather_data => {
    return SUN;
  };

  getData = weather_data => {
    const { humidity, temp } = weather_data.main;
    const { speed } = weather_data.wind;
    const weatherState = this.getweatherState(weather_data);

    const data = {
      humidity,
      temperature: temp,
      weatherState,
      wind: `${speed} m/s`
    };

    return data;
  };
  handleUpdateClick = () => {
    fetch(api_weather)
      .then(resolve => {
        return resolve.json();
      })
      .then(data => {
        const newWeather = this.getData(data);
        console.log(newWeather);

        this.setState({
          data: newWeather
		});
		debugger;
      });
  };
  render() {
    const { city, data } = this.state;
    return (
      <div className="weatherLocationCont">
        <Location city={city} />
        <WeatherData data={data} />
        <button onClick={this.handleUpdateClick}> Actualizar </button>
      </div>
    );
  }
}

export default WeatherLocation;
