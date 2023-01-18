import React,{useEffect,useState} from 'react'
import { optionTypes,ForcastType } from '../types/model'

const useForcast = () => {
  const [term,setTerm ] = useState<string>("")
  const Key = "bbf1e6c66409475f1b02cca8a05809fc"
  const [options,setOptions] = useState<[]>([]) 
  const [city,setCity ] = useState<optionTypes | null>(null)
  const [forcast,setForcast]=useState<ForcastType | null>(null)

  const getSearchOptions=(value:string)=>{
    fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${Key}`)
    .then(res=>res.json())
    .then(data=>{
     setOptions(data)
    })
  }

  const onInputchange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value.trim()
    setTerm(value)
    if(value ===""){return}
    getSearchOptions(value)
  }

  const getForcast =(city:optionTypes)=>{
   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${Key}`)
    .then(res=>res.json())
    .then(data=> {
        
        const forcastData = {
            ...data.city,
            list:data.list.slice(0,16)
        }
        console.log(forcastData)
        setForcast(forcastData)
    }) 
    
  
  }

  const onSearch=()=>{
    if(!city){return}
    getForcast(city)
    
  }


  const onOptionSelect =(option:optionTypes)=>{
    setCity(option)
  }

  useEffect(()=>{
    if(city){
      setTerm(city.name)
      setOptions([])
    }
  },[city])

  
  return{
    term,options,forcast,onInputchange,onOptionSelect,onSearch
  }
}

export default useForcast
