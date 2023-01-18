import { useEffect, useState } from 'react'
import '../App.css'
import { optionTypes } from '../types/model'

interface Props {
  options:[],
  onOptionSelect: (city:optionTypes) =>void
  onInputchange: (e:React.ChangeEvent<HTMLInputElement>) => void,
  onSearch:()=>void,
  term:string

} 


function Search({options,onOptionSelect,onInputchange,onSearch,term}:Props):JSX.Element {
 
  return (
    <div >
     <section className='section'>
        <h2 className='weathertitle'>Weather <span className='strong'>Forcast</span></h2>
        <p className='info'>Enter below a place you want to know the weather of and select an option from the list</p>
        <div className='formWrapper'>  
        <input className='input' type="text" value={term} onChange={onInputchange}/> 
          
          <ul className='list'>
          {options.map((item:optionTypes,index:number)=>(
            <li  key={item.name +"-" + index }>
              <button className='list-item' onClick={()=>onOptionSelect(item)}>{item.name} ,{item.country}</button>
            </li>
            
          ))}
          </ul>
          <button className='search' onClick={onSearch}>Search</button>      
        </div>
     </section>
    </div>
  )
}

export default Search
