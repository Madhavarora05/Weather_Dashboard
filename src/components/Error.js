import React from 'react';
import './Error.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h3>Something went wrong</h3>
        <p>{message}</p>
        <button 
          className="error-button"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;