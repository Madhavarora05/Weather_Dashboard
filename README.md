# Weather Dashboard

A modern and responsive Weather Dashboard web application built with React.js. It fetches real-time weather data using the OpenWeatherMap API and provides users with live weather updates for any searched city. The app includes features such as a 5-day weather forecast, search history, and a clean, user-friendly interface.

## Deployment Link

[Weather Dashboard](https://weather-dashboard-neon-gamma.vercel.app/)

## Features

- **Real-Time Weather Updates**: Get current weather conditions for any city worldwide.
- **5-Day Forecast**: View a detailed 5-day weather forecast.
- **Search History**: Save and access recent city searches.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Error Handling**: User-friendly error messages for invalid searches or API issues.

## Screenshots

- **Weather Dashboard Interface**
  ![Screenshot 1](/screenshot/screenshot1.png)

## Tech Stack

- **Frontend**: React.js
- **API**: OpenWeatherMap API
- **Icons**: React Icons

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Madhavarora05/Weather_Dashboard.git
   cd Weather_Dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Scripts

- `npm start`: Start the development server.
- `npm run build`: Build the app for production.
- `npm test`: Launch the test runner.

## Folder Structure

```
Weather_Dashboard/
├── public/               # Static assets
│   ├── index.html        # Main HTML file
│   └── favicon.ico       # Favicon
├── src/
│   ├── components/       # React components
│   │   ├── SearchBar.js  # Search bar component
│   │   ├── WeatherCard.js# Weather display component
│   │   └── Forecast.js   # 5-day forecast component
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── App.css           # Global styles
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── LICENSE               # License file
├── README.md             # Project documentation
├── package.json          # Project configuration
└── package-lock.json     # Lockfile for dependencies
```

## Environment Variables

The app requires the following environment variable:

- `REACT_APP_WEATHER_API_KEY`: Your OpenWeatherMap API key.

## API Integration

The app uses the OpenWeatherMap API to fetch weather data. You can sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/api) for providing weather data.
- [React Icons](https://react-icons.github.io/react-icons/) for the icons used in the app.
