import { useEffect, useState } from 'react'
import './App.css'
import { optionTypes } from './types/model'
import Search from './component/Search'

function App():JSX.Element {
   //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  const [term,setTerm ] = useState<string>("")
  const Key = "bbf1e6c66409475f1b02cca8a05809fc"
  const [options,setOptions] = useState<[]>([]) 
  const [city,setCity ] = useState<optionTypes | null>(null)

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
    .then(data=>console.log(data)) 
  
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

  console.log(term)
  return (
    
    <div className="App">
     <Search options={options} onOptionSelect={onOptionSelect} onInputchange={onInputchange} onSearch={onSearch} term={term} ></Search>
    </div>
  )
}

export default App
