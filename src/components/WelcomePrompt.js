import React from 'react';
import './WelcomePrompt.css';

const WelcomePrompt = () => {
  return (
    <div className="welcome-prompt">
      <div className="welcome-icon">🌍</div>
      <h2>Welcome to Weather Dashboard</h2>
      <p>Enter a city name above to check the weather</p>
    </div>
  );
};

export default WelcomePrompt;