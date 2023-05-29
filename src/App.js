import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';



const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiKey = 'fbad332562eb60fd54fa95612e246dc4'; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } else {
        setError('Unable to fetch weather data. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while fetching weather data.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Get Weather
              </button>
            </div>
          </form>

          {error && <p className="text-danger">{error}</p>}

          {weatherData && (
            <div className="mt-4">
              <h2 className="mb-3">Weather Information</h2>
              <p>
                <strong>City:</strong> {weatherData.name}
              </p>
              <p>
                <strong>Temperature:</strong> {weatherData.main.temp}°C
              </p>
              <p>
                <strong>Condition:</strong> {weatherData.weather[0].main}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
