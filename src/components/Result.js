import React from "react";

const Result = props => {
  const {
    err,
    cityFromAPI,
    country,
    temp,
    wind,
    pressure,
    sunrise,
    sunset,
    date,
    icon,
    desc,
    countryFlag
  } = props.weather;

  let content = null;
  if (!err && cityFromAPI) {
    props.fetchCountryName();
    content = (
      <>
        <h1>
          City: <span className="city">{cityFromAPI}</span>, {country}{" "}
          <img className="countryFlag" src={countryFlag} alt="country-flag" />
        </h1>
        <img
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="weather-icon"
        />
        <h2>{desc}</h2>
        <h1>
          Temperature: <span className="temp">{temp} &#8451;</span>
        </h1>
        <h2>Wind speed: {wind} m/s</h2>
        <h2>Pressure: {pressure} hPa</h2>
        <h2>Sunrise: {sunrise}</h2>
        <h2>Sunset: {sunset}</h2>
        <h3>Date: {date}</h3>
      </>
    );
  }
  return (
    <>
      <div>{err ? `City not found` : content}</div>
    </>
  );
};

export default Result;
