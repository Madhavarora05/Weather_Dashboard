import React from 'react';
import './History.css';

const History = ({ history, onSelect, onDelete }) => {
    if (!history?.length) return null;

    return (
        <div className="recent-searches">
            <h5>Last Searches</h5>
            <div className="search-chips">
                {history.map((city, i) => (
                    <div className="chip" key={i}>
                        <span onClick={() => onSelect(city)}>
                            {city}
                        </span>
                        <button 
                            className="chip-delete" 
                            onClick={() => onDelete(city)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;