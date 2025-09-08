import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const API_KEY = "32d9ead3ff575c987a2240b99c845f96";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [todayTemps, setTodayTemps] = useState([]);
  const [aqi, setAqi] = useState({ co: "-", so2: "-", o3: "-", no2: "-" });

  const formatDate = (timestamp) => {
    if (!timestamp) return { date: "-", time: "-" };
    const date = new Date(timestamp * 1000);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const resetAll = () => {
    setWeather(null);
    setForecast([]);
    setTodayTemps([]);
    setAqi({ co: "-", so2: "-", o3: "-", no2: "-" });
    setCity("");
  };

  const fetchAQIData = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!res.ok) return;
      const data = await res.json();
      if (!data?.list?.[0]?.components) return;

      const list = data.list[0].components;
      setAqi({
        co: list.co,
        so2: list.so2,
        o3: list.o3,
        no2: list.no2,
      });
    } catch (err) {
      console.error("AQI fetch error:", err);
    }
  };

  const fetchNextFiveDays = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) return;

      const data = await res.json();
      if (!data?.list) return;

      let daily = {};
      data.list.forEach((item) => {
        let date = item.dt_txt.split(" ")[0];
        if (!daily[date] && item.main?.temp) {
          daily[date] = {
            temp: item.main.temp.toFixed(1),
            day: new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
          };
        }
      });

      if (Object.keys(daily).length === 0) return;
      setForecast(Object.entries(daily).slice(0, 5));
    } catch (err) {
      console.error("Forecast fetch error:", err);
    }
  };

  const fetchTodayTemps = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) return;

      const data = await res.json();
      if (!data?.list) return;

      let todayDate = new Date().toISOString().split("T")[0];
      let todayForecasts = data.list.filter(
        (item) => item.dt_txt.startsWith(todayDate) && item.main?.temp
      );

      if (todayForecasts.length === 0) return;
      setTodayTemps(todayForecasts.slice(0, 6));
    } catch (err) {
      console.error("Today temps fetch error:", err);
    }
  };

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a valid input");
      resetAll();
      return;
    }

    try {
      const query = city.includes(",") ? city : `${city},in`;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        alert("City not found. Please enter a valid city name.");
        resetAll();
        return;
      }

      const data = await res.json();
      if (!data?.coord || !data?.main?.temp || !data?.name) {
        alert("Incomplete data. Please try another city.");
        resetAll();
        return;
      }

      setWeather(data);

      let { lat, lon } = data.coord;
      if (lat && lon) {
        fetchAQIData(lat, lon);
        fetchNextFiveDays(lat, lon);
        fetchTodayTemps(lat, lon);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      alert("Something went wrong. Please enter a valid input.");
      resetAll();
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="searchBar">
        <div className="searchBarParentDiv">
          <input
            type="text"
            className="inputfield"
            placeholder="Search City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <img
            src="/search.png"
            alt="Search"
            width="35px"
            className="searchIcon"
            onClick={fetchWeather}
          />
        </div>
      </div>

      <div className="mainContentParentDiv">
        {/* Left Panel */}
        <div className="leftDiv">
          <div className="currentTempDiv leftChild p-3 d-flex flex-column gap-2">
            <h6>{weather?.name || "City Name"}</h6>
            <h5>{weather?.main?.temp ?? "-"} &deg;C</h5>
            <h6>{weather?.weather?.[0]?.description || "Sky Description"}</h6>
            <hr className="line" />
            <div className="d-flex gap-2">
              <img src="/calendar.png" alt="" width="25px" />
              <h6>{weather ? formatDate(weather.dt).date : "Date"}</h6>
            </div>
            <div className="d-flex gap-2">
              <img src="/time.png" alt="" width="25px" />
              <h6>{weather ? formatDate(weather.dt).time : "Time"}</h6>
            </div>
          </div>

          <div className="nextFiveDays leftChild p-3 d-flex flex-column gap-2">
            <h6>Coming 5 Days</h6>
            <div className="d-flex flex-column gap-1">
              {forecast.map(([date, f], i) => (
                <div
                  key={i}
                  className="forecastRow d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex gap-1 align-items-center">
                    <img src="/cloud.png" alt="" width="35px" />
                    <h6>{f.temp ?? "-"} &deg;C</h6>
                  </div>
                  <h6>{f.day}</h6>
                  <h6>{date}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="rightDiv">
          {/* Metrics */}
          <div className="rightRow rowOne d-flex gap-2 justify-content-between align-items-center flex-wrap">
            <div className="extraMetric d-flex gap-3">
              <img src="/flood.png" alt="" width="35px" />
              <div>
                <h6>Humidity</h6>
                <h6>{weather?.main?.humidity ?? "-"}</h6>
              </div>
            </div>
            <div className="extraMetric d-flex gap-3">
              <img src="/wind.png" alt="" width="35px" />
              <div>
                <h6>Pressure</h6>
                <h6>{weather?.main?.pressure ?? "-"}</h6>
              </div>
            </div>
            <div className="extraMetric d-flex gap-3">
              <img src="/hot.png" alt="" width="35px" />
              <div>
                <h6>Feels like</h6>
                <h6>{weather?.main?.feels_like ?? "-"}</h6>
              </div>
            </div>
            <div className="extraMetric d-flex gap-3">
              <img src="/eye.png" alt="" width="35px" />
              <div>
                <h6>Visibility</h6>
                <h6>{weather?.visibility ?? "-"}</h6>
              </div>
            </div>
          </div>

          {/* AQI + Sunrise/Sunset */}
          <div className="rightRow rowTwo d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="AQI rowTwoDiv p-3 d-flex flex-column gap-2">
              <h5>Air Quality Index (AQI)</h5>
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="text-center">
                  <h6>CO</h6>
                  <h6>{aqi.co}</h6>
                </div>
                <div className="text-center">
                  <h6>SO2</h6>
                  <h6>{aqi.so2}</h6>
                </div>
                <div className="text-center">
                  <h6>O3</h6>
                  <h6>{aqi.o3}</h6>
                </div>
                <div className="text-center">
                  <h6>NO2</h6>
                  <h6>{aqi.no2}</h6>
                </div>
              </div>
            </div>

            <div className="sunRise rowTwoDiv p-3 gap-2">
              <h5>Sunrise & Sunset</h5>
              <div className="d-flex justify-content-between">
                <div className="sunriseDiv d-flex gap-2 align-items-center">
                  <img src="/sun.png" alt="" width="75px" />
                  <div>
                    <h6>Sunrise</h6>
                    <h5>
                      {weather ? formatDate(weather.sys?.sunrise).time : "-"}
                    </h5>
                  </div>
                </div>
                <div className="sunsetDiv d-flex gap-2 align-items-center">
                  <img src="/moon.png" alt="" width="65px" />
                  <div>
                    <h6>Sunset</h6>
                    <h5>
                      {weather ? formatDate(weather.sys?.sunset).time : "-"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today temps */}
          <div className="rightRow rowThree d-flex flex-column gap-2">
            <h5>Today</h5>
            <div className="d-flex flex-wrap justify-content-between todayTempParentDiv">
              {todayTemps.map((item, i) => (
                <div key={i} className="todayTemp">
                  <h6>
                    {new Date(item.dt_txt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </h6>
                  <img src="/cloudy.png" alt="" width="35px" />
                  <h5>{item.main?.temp?.toFixed(1) ?? "-"} &deg;C</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
