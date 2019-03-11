import React from 'react';
import WeatherIcon from 'react-weathericons';
import PropTypes from 'prop-types';
import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY,
} from './../../../constants/weathers';

const icons = {
[CLOUD]: "cloud",
[CLOUDY]: "cloudy",
[SUN]: "day-sunny",
[RAIN]: "rain",
[SNOW]: "snow",
[WINDY]: "windy"
};


const getWeatherIcon = weatherState => {
    const icon = icons[weatherState];

    const sizeIcon = "4x";
    if(icon)
        return <WeatherIcon className="wicon" name={icon} size={sizeIcon} />;
    else
        return <WeatherIcon className="wicon" name={"day-sunny"} size={sizeIcon} />;
}
const WeatherTemperature = ({ temperature, weatherState }) => (
    <div className="weatherTemperatureCont">
        {
            getWeatherIcon( weatherState )
        }
        <span className="temperature">{`${temperature}`}</span>
        <span className="temperatureType">{` C°`}</span>
    </div>
);

WeatherTemperature.propTypes = {
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.string.isRequired,
};

export default WeatherTemperature;