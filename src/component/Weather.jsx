import React, { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloudy_icon from "../assets/cloudy.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  // usestate
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(clear_icon);
  // store image
  const iconMap = {
    Clouds: cloudy_icon,
    Rain: rain_icon,
    Drizzle: drizzle_icon,
    Snow: snow_icon,
    Clear: clear_icon,
  };

  // Api Fatch
  const weatherApi = async (cityName) => {
    if (!cityName) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_ID}`;
      let res = await axios(url);
      setWeather(res.data);

      const condition = res.data.weather[0].main;

      setIcon(iconMap[condition] || clear_icon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    weatherApi();
  }, []);

  return (
    <div className="weather">
      {/*  search_bar */}
      <div className="search_bar">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setCity(e.target.value)}
        />
      {/*   image */}
        <img
          src={search_icon}
          alt="Search_bar"
          className="search_icon"
          onClick={() => weatherApi(city)}
          width={15}
        />
      </div>
    {/*   temperature */}
      <img src={icon} alt="clear_icon" className="clear_icon" />
      <p className="temperature">
        {" "}
        {weather ? `${weather.main.temp} °C` : "Loading..."}
      </p>
     {/*  location */}
      <p className="location">{weather ? weather.name : ""}</p>
      
      {/* humidity and wind info */}
      <div className="weather_data">
        <div className="col">
          <img src={humidity_icon} alt="humidity_icon" />
          <p>{weather ? `${weather.main.humidity}%` : "--"}</p>
          <span>Humidity</span>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind_icon" />
          <p>{weather ? `${weather.wind.speed} km/h` : "--"}</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
