import { useEffect, useState } from 'react'
import './App.css'
import { ForcastType, optionTypes } from './types/model'
import Search from './component/Search'
import useForcast from './hooks/useForcast'
import Forcast from './component/Forcast'


function App():JSX.Element {
   //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  const {term,options,forcast,onInputchange,onOptionSelect,onSearch} = useForcast()

  return (
    
    <div className="App">
      {forcast?
      <Forcast data ={forcast} />:
      <Search options={options} onOptionSelect={onOptionSelect} onInputchange={onInputchange} onSearch={onSearch} term={term} ></Search>
    }
    </div>
  )
}

export default App
