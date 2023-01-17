import { useState } from 'react'
import './App.css'

function App():JSX.Element {
   //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  const [term,setTerm ] = useState<string>("")
  const Key = "bbf1e6c66409475f1b02cca8a05809fc"
  const [options,setOptions] = useState<[]>([]) 

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
  console.log(term)
  return (
    <div className="App">
     <section className='section'>
        <h2 className='weathertitle'>Weather <span className='strong'>Forcast</span></h2>
        <p className='info'>Enter below a place you want to know the weather of and select an option from the list</p>
        <div className='formWrapper'>  
        <input className='input' type="text" value={term} onChange={onInputchange}/> 
          
          <ul className='list'>
          {options.map((item:{name:string,country:string})=>(
            <p>{item.name}, {item.country}</p>
          ))}
          </ul>
          



          <button className='search'>Search</button>      
        </div>
     </section>
    </div>
  )
}

export default App
