
import React, { useEffect, useState } from 'react';
import "../style.css";

// componets
import WeatherCard from './weatherCard';



const Temp = () => {

    const [searchValue, setSearchValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=030075f6031efd0eca4ba3cc186e9aff`

            const res = await fetch(url);
            let data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys; 


            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                speed,
                name,
                country,
                sunset
            };
            
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo();
    },[])

  return (
        <>
            <div className='wrap'>
                    <div className='search'>
                        <input type="search"
                         value={searchValue}
                         onChange={(e) => setSearchValue(e.target.value)}
                         placeholder='search...'   
                         autoFocus
                         id="search"
                         className='searchTerm'
                         />
                            <button type='button' className='searchButton' onClick={getWeatherInfo}>
                                Search
                            </button>
                    </div>
            </div>     
            <WeatherCard tempInfo = {tempInfo}/>      
        </>
  )
}

export default Temp;