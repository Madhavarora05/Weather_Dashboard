import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './WeatherCard.css';

const WeatherCard = ({ weather, onRefresh }) => {
    if (!weather) return null;

    const getWeatherClass = () => {
        const condition = weather.weather[0].main.toLowerCase();
        const types = {
            clear: 'weather-clear',
            rain: 'weather-rain',
            snow: 'weather-snow',
            clouds: 'weather-clouds',
            thunderstorm: 'weather-storm'
        };
        return types[condition] || 'weather-default';
    };

    return (
        <div className={`weather-card ${getWeatherClass()}`}>
            <div className="card-header">
                <div className="last-updated">
                    {new Date().toLocaleTimeString()}
                </div>
                <button className="refresh-button" onClick={() => onRefresh(weather.name)}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </button>
            </div>
            <div className="weather-info">
                <div className="current-weather">
                    <div className="weather-icon">
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt="Weather"
                        />
                    </div>
                    <div className="weather-details">
                        <h2>{weather.name}</h2>
                        <div className="temperature">{Math.round(weather.main.temp)}°C</div>
                        <div className="condition">{weather.weather[0].description}</div>
                        <div className="extra-info">
                            <div className="info-item">
                                <span>Humidity: </span>
                                <span>{weather.main.humidity}%</span>
                            </div>
                            <div className="info-item">
                                <span>Wind Speed: </span>
                                <span>{Math.round(weather.wind.speed * 3.6)} km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;