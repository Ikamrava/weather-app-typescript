import React from 'react'
import { ForcastType } from '../types/model'
import "./forcast.css"
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import { getSunTime } from '../helper'

type Props = {
  data:ForcastType
}
const Forcast = ({data}:Props):JSX.Element => {
    const today = data.list[0]
    const days = data.list.map((item ,i)=>{
        return(   
        <div key={i}>
            <p>{i===0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={`weather_icon_${item.weather[0].description}`} />
            <p className='hourly-degree'>{Math.round(item.main.temp)}<sup>o</sup></p>
        </div>)
   
    })
  return (
    <div>
    <section className='forcastSection'>
        <h2>{data.name}<span> {data.country}</span></h2>
        <h1 className='degree'>
         {Math.round(today.main.temp)}<sup> o</sup>
        </h1>
        <p>{today.weather[0].main} {today.weather[0].description}</p>
        H: {Math.ceil(today.main.temp_max)}<sup>o</sup> 
        L: {Math.floor(today.main.temp_min)}<sup>o</sup>
        <div className='daysWrapper'>{days}</div>
    </section>

    <section className='forcastSection forcatsDetails'>
        <div className='double_section'>
          <Sunrise/><span>{getSunTime(data.sunrise)}</span>
        </div>
        <div className='double_section'>
           <Sunset/><span>{getSunTime(data.sunset)}</span>
        </div>
    </section>
    
    
    </div>
    
  )

}

export default Forcast
