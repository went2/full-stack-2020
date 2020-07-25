import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';

const api_key = process.env.REACT_APP_API_KEY;

const left = {
  float: "left",
  width: "500px",
  
};

const right = {
  overflow: "hidden"
};

const flag = {
  width: "100px",
};

const App = () => {
  // 1. set state
  const [country, setCountry] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [countryInfo, setCountryInfo] = useState({});
  const [captialWeather, setCaptialWeather] = useState({});

  // 2. set hook
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => {
        setCountry(res.data);
      })
  };
  useEffect(hook, [])

  // 3. set event handler
  const handleSearchInput = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    
  };

  // 更改状态是异步操作，如何做到把输入的字符设为状态后，立马使用该状态？
  // 更改状态 导致 重新渲染，在渲染部分添加一个表达式，在重新渲染时会重新计算表达式的值
  const showCountry = () => 
    !inputValue ? [] : 
    country.filter(item => 
      item.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  
  let countryToShow = showCountry();

  const showOneCountry = () => {
    return (
      <div>
        <h1>{ countryToShow[0].name }</h1>
        <h4>capital { countryToShow[0].capital }</h4>
        <h4>population { countryToShow[0].population }</h4>
        <h2>Languages</h2>
        {    
          countryToShow[0].languages.map((item) => {
            return <li key={item.name}>{item.name}</li>
          })
        }
        <img src={ countryToShow[0].flag } alt='flag' style={ flag } />
      </div>
    );
  };

  const showCountryInfo = (event,item) => {
    event.preventDefault();
    console.log(item.name);
    setCountryInfo(item);
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + item.capital)
      .then((res) => {
        console.log('weather object fetched', res.data.current);
        setCaptialWeather(res.data.current);
      })
      .catch((error) => {
        alert(error);
      })
  }

  const displayCountryInfo = () => {
    if ( Object.keys(countryInfo).length === 0 ) {
      return null;
    } else {
      return (
        <div>
        <h1>{ countryInfo.name }</h1>
        <h3>capital { countryInfo.capital }</h3>
        <h3>population { countryInfo.population }</h3>
        <h2>Languages</h2>
        {    
          countryInfo.languages.map((item) => {
            return <li key={item.name}>{item.name}</li>
          })
        }
        <img src={ countryInfo.flag } alt='flag' style={flag} />
        <h3>Weather in { countryInfo.capital }</h3>
        <h4>temperature: { captialWeather.temperature } Celcius</h4>
        <h4>weather: { captialWeather.weather_descriptions } </h4> 
        <img src={ captialWeather.weather_icons } alt='' /> 
        <h4>wind: { captialWeather.wind_speed } mph direction { captialWeather.wind_dir } </h4>
      </div>
      );
    }
  };

  // 4. return layout
  return (
    <div>
      <div style={left}>
        <Search 
          country = { country } 
          inputValue = { inputValue }
          handleSearchInput = { handleSearchInput }
        />
        { 
        countryToShow.length  > 10 ? 
          'too many matches, specify another filter' :
          ( countryToShow.length === 1 ? showOneCountry() : 
            countryToShow.map((item) => 
              <div key={item.name}>{item.name} 
                <button
                  style={{marginLeft:"8px"}}
                  onClick={ (event) => showCountryInfo(event, item) }
                >show</button>
              </div>
            ) 
          )
        }
      </div>
      <div style={right}>
        { displayCountryInfo() }
      </div>
    </div>
  )
}

export default App;