import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import History from './components/History';
import Loader from './components/Loader';
import Error from './components/Error';
import WelcomePrompt from './components/WelcomePrompt';
import './App.css';

const App = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchHistory, setSearchHistory] = useState(() => {
        return JSON.parse(localStorage.getItem("weatherHistory")) || [];
    });
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const saveCity = (city) => {
        const newHistory = [city, ...searchHistory.filter(item => item !== city)].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
    };

    const removeCity = (city) => {
        const newHistory = searchHistory.filter(item => item !== city);
        setSearchHistory(newHistory);
        localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
    };

    const getDailyForecast = (list) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const days = {};

        list.forEach(item => {
            const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
            if (date === today) return;

            const key = new Date(item.dt * 1000).toISOString().split('T')[0];
            if (!days[key] || Math.abs(12 - new Date(item.dt * 1000).getHours()) < Math.abs(12 - new Date(days[key].dt * 1000).getHours())) {
                days[key] = item;
            }
        });

        return Object.values(days).slice(0, 5);
    };

    const getWeather = async (city) => {
        setLoading(true);
        setError('');
        
        try {
            const [weatherData, forecastData] = await Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            ]);

            setWeather(weatherData.data);
            setForecast(getDailyForecast(forecastData.data.list));
            saveCity(city);
        } catch (err) {
            setError('City not found');
        }
        
        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Weather App</h1>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="darkMode"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                    <label className="form-check-label" htmlFor="darkMode">
                        {darkMode ? 'Dark' : 'Light'}
                    </label>
                </div>
            </div>

            <SearchBar onSearch={getWeather} />

            {loading ? <Loader /> : error ? <Error message={error} /> : (
                <div className="dashboard-grid">
                    <div className="main-content">
                        {weather ? (
                            <>
                                <WeatherCard weather={weather} onRefresh={getWeather} />
                                {forecast.length > 0 && (
                                    <div className="forecast-container mt-4">
                                        {forecast.map((day, i) => (
                                            <div key={i} className="forecast-card">
                                                <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Weather" />
                                                <p>{Math.round(day.main.temp)}°C</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : <WelcomePrompt />}
                    </div>
                    {searchHistory.length > 0 && (
                        <div className="sidebar">
                            <History
                                history={searchHistory}
                                onSelect={getWeather}
                                onDelete={removeCity}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;