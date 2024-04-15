import React, {useState} from "react";
import axios from "axios";
import videoSource from "./assets/skysun.mp4"; 

function App() {
const [data,setData] = useState({})
const [location,setLocation] = useState('')


const searchLocation = (event) => {
  if (event.key === 'Enter') {
    const city = location.trim();
    const apiKey = "0198b13f05d700b5a9c7ce2746fe0fd1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    axios.get(url)
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      })
      .finally(() => {
        setLocation('');
      });
  }
}






  return (
    <div className="app">
      <div className="search">
        <input
        value ={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        placeholder='Enter Location'
        type="text"/>

      </div>
<div className="container">
<div className="video-background">
<video autoPlay muted loop id="video-bg">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video></div>
<div className="top">
  <div className="location">
    <p>{data.name}</p>
  </div>
  <div className="temp">
    {data.main ?<h1>{data.main.temp.toFixed()}°C</h1> : null}
  </div>
  
  <div className="description">
  
    
{data.weather ? <p>{data.weather[0].main}</p> : null}  </div>
</div>
{data.main !== undefined &&
<div className="bottom">
  <div className="feels">
    {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °C</p> : null}
    <p className="bold"></p>
    <p>Feels like</p>
  </div>
  <div className="humidity">
    {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
    <p className="bold"></p>
  <p>Humidity</p>
  </div>
  <div className="wind">
    {data.wind ? <p>{data.wind.speed.toFixed()} mi/h</p> : null}
    <p className="bold"></p>
  <p>Wind Speed</p>
  </div>
</div>
} </div>
    </div>

  );
}

export default App;
