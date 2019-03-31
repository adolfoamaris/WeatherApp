import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';

// const days = [
//     'Lunes',
//     'Martes',
//     'Miercoles',
//     'Jueves',
//     'Vierenes',
// ];

// const data = {
//     temperature: 10,
//     humidity: 10,
//     weatherState: 'normal',
//     wind: 'normal'
// }

const api_key = "67eca41b387fb2e6f5f9fcb872be4015";
const url = "http://api.openweathermap.org/data/2.5/forecast";
class ForecastExtended extends Component {
    constructor() {
        super();
        this.state = { forecastData: null }
    }

    componentDidMount() {
        //fetch or axios
        const url_forecast = `${url}?q=${this.props.city}&appid=${api_key}`;
        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData);
                this.setState({ forecastData });
            }
        )

    }

    renderForcastItemDays(forecastData) {
        return forecastData.map(forecast => (
            <ForecastItem
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={forecast.weekDay}
                hour={forecast.hour}
                data={forecast.data}>
            </ForecastItem>));
    }

    renderProgress = () => {
        return <h3>Cargando Pronóstico extendido...</h3>;
    }

    render() {
        const { city } = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className="forecast-title"> Pronóstico Extendido para {city}</h2>
                {forecastData ?
                    this.renderForcastItemDays(forecastData) :
                    this.renderProgress()
                }
            </div>);
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;