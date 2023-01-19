import React, { useState } from 'react'
import { ForcastType } from '../types/model'
import "./forcast.css"
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from '../helper'
import Tile from './Tile'

type Props = {
  data:ForcastType
}

const date = (date:string):string=>{
  const listofMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const monthText = listofMonths[Number(date.slice(6,7))-1]
  const day = date.slice(8,10)
  return  (`${day} ${monthText}`)
}

console.log(date("2023-01-19 21:00:00"))

const Degree = ({temp}:{temp:number}):JSX.Element=>{
 return (<span className='degreeSpan'>{temp}<sup>o</sup></span>)
}
const Forcast = ({data}:Props):JSX.Element => {
    const [day,setDay]=useState<number>(0)
    const today = data.list[day]
    const changeDate=(i:number)=>{
      setDay(i)
    }
    const days = data.list.map((item ,i)=>{
        return(   
        <div className='date' key={i} onClick={()=>changeDate(i)}>
            <p>{i===0 ? <div>{`${date(item.dt_txt)}  Now`}</div> : 
            <div>{`${date(item.dt_txt)}  ${new Date(item.dt_txt).getHours()}:00`}</div>}</p>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={`weather_icon_${item.weather[0].description}`} />
            <p className='hourly-degree'>{Math.round(item.main.temp)}<sup>o</sup></p>
        </div>)
   
    })
  return (
    <div className='forcastWrapper'>
    <section className='forcastSection'>
        <h2>{data.name}<span> {data.country}</span></h2>
        <h1 className='degree'>
         {Math.round(today.main.temp)}<sup> o</sup>
        </h1>
        <p>{today.weather[0].main}, {today.weather[0].description}</p>
        <div className='lowandhigh'>
          <span> High: {Math.ceil(today.main.temp_max)}<sup>o</sup></span> 
          <span>
            Low: {Math.floor(today.main.temp_min)}<sup>o</sup>
          </span>
          
        </div>
        
        <div className='daysWrapper'>{days}</div>
    </section>

    <section className='forcastSection forcatsDetails'>
        <div className='first_double_section'>
          <Sunrise/><span>{getSunTime(data.sunrise)}</span>
        </div>
        <div className='first_double_section'>
           <Sunset/><span>{getSunTime(data.sunset)}</span>
        </div>
        
    </section>
    
   <section className='forcastSection forcatsDetails'>
    <div className='other_double_section '>
      <Tile  icon={"wind"} title={"Wind"} info={Math.round(today.wind.speed)+" km/h"} description={`${getWindDirection(today.wind.deg)}, gusts ${today.wind.gust.toFixed(1)+" km/h"} `}/>
    </div>
    <div className='other_double_section '>
      <Tile  icon={"feels"} title={"Feels like"} info={<Degree temp={Math.round(today.main.temp)}/>} description={`Feels ${
        Math.round(today.main.feels_like)< Math.round(today.main.temp)?
        "Colder":
        "Warmer"
      }`}/>
    </div>
    </section>

     <section className='forcastSection forcatsDetails'>
    <div className='other_double_section '>
      <Tile  icon={"humidity"} title={"Humidity"} info={(today.main.humidity)+" %"} description={`${getHumidityValue(today.main.humidity)} `}/>
    </div>
    <div className='other_double_section '>
      <Tile  icon={"pop"} title={"Precipitation"} info={today.pop} description={`${getPop(today.pop)}, Clouds at ${today.clouds.all}%`}/>
    </div>
    </section>

    <section className='forcastSection forcatsDetails'>
    <div className='other_double_section '>
      <Tile  icon={"pressure"} title={"Pressure"} info={(today.main.pressure)+" hPa"} description={`${Math.round(today.main.pressure)<1013 ? "Lower":"Higher"} `}/>
    </div>
    <div className='other_double_section '>
      <Tile  icon={"visibility"} title={"Visibility"} info={(today.visibility / 1000).toFixed() + " km"} description={`${getVisibilityValue(today.visibility)}`}/>
    </div>
    </section>
    
    
    </div>
    
  )

}

export default Forcast
