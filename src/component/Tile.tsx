import React from 'react'
import Feels from './Icons/Feels'
import Wind from './Icons/Wind'
import Humidity from './Icons/Humidity'
import Pop from './Icons/Pop'
import Pressure from './Icons/Pressure'
import Visibility from './Icons/Visibility'
import "./forcast.css"


type Props = {
  icon:"wind" | "feels" | "humidity" | "visibility" | "pressure" | "pop"
  title:string
  info:string | number | JSX.Element
  description:string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity:Humidity,
  visibility:Visibility,
  pressure:Pressure,
  pop:Pop

}

const Tile = ({icon,title,info,description}:Props):JSX.Element => {
  const Icon = icons[icon]
  
  return (
    <article className='article'>
      <div className='tileWrapper'>
        <Icon/> <h4>{title}</h4>
      </div>
       <h4>{info}</h4>
       <p>{description}</p>
    </article>
  )
}

export default Tile
