import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {
 
  const [finder, setFinder] = useState(Math.floor(Math.random()* 126+1));
  const [location, getLocation, isLoading, hasError] = useFetch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
  }, [finder]);

  const textInput = useRef();
  const handleSubmit = event =>{
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }

  const quantity = 5;
  const second = currentPage * quantity;
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first, second);
  const totalPage = location && Math.floor(location.residents.length / quantity)+ 1;


  return (
    <div className='app'>
      {
        isLoading ?
        <div className='container_load'>
        <img className='img_load' src='./load1.gif' alt='img load'/>
        </div>
        :
        <>
         <div className='container_banner'>
          <img className='img_banner' src='./66133.jpg' alt='img banner'/>
        </div>
          <form 
            onSubmit={handleSubmit}
            className='app_form'
            >
            <input 
            className='app_text'
            type='number' 
            ref={textInput}
            placeholder='type to number(1 at 126)'
          />
        <button className='app_btn'>Search</button>
        </form>
        {
          hasError || finder==='0' ?
          <h2>This location do not exist</h2>
           :
          <>
              <LocationCard
              location={location}
             />
             <div className='app_container'>
            {
               residentsPart.map(resident =>(
              <ResidentCard
              key={resident}
              url={resident}
              />
            ))
            }
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </>
        }
      
        </>
      }      
    </div>
  )
}

export default App;
