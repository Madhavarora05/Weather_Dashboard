import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";

    useEffect(() => {
        if (city.length > 1) {
            const getCities = async () => {
                try {
                    const response = await axios.get(`${GEO_API_URL}?q=${city}&limit=5&appid=${API_KEY}`);
                    setSuggestions(response.data.map(place => place.name));
                } catch (err) {
                    setSuggestions([]);
                }
            };

            const timer = setTimeout(getCities, 300);
            return () => clearTimeout(timer);
        } else {
            setSuggestions([]);
        }
    }, [city, API_KEY]);

    const search = e => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity("");
            setSuggestions([]);
        }
    };

    const pickCity = name => {
        setCity(name);
        onSearch(name);
        setSuggestions([]);
    };

    return (
        <div className="position-relative">
            <form onSubmit={search} className="d-flex">
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="form-control me-2"
                    required
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>

            {suggestions.length > 0 && (
                <div className="dropdown-menu show w-100 mt-1 shadow">
                    {suggestions.map((city, i) => (
                        <div 
                            key={i} 
                            className="dropdown-item" 
                            onClick={() => pickCity(city)}
                        >
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;