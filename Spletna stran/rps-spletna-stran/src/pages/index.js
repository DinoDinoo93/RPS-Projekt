
import React, { useState, useEffect } from 'react';
import Carousel from 'react-grid-carousel'
import data from "../data.json"
import { useNavigate } from "react-router-dom";



const Home = () => {
    let textInput = React.createRef();
    let navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [rezultati, setRezultati] = useState([]);
  const [cene, setCena] = useState([]);
  async function getRezultati() {
    const res = await fetch(`http://localhost:3001/izdelek`)
    const data = await res.json();
    return data;
  }

    const handleChange = event => {
      setMessage(event.target.value);
    };

    let onOnclickHandler = (e) => {
      navigate("/searchItems?search=" + message);
    };

    useEffect(function(){
      getRezultati()
      .then((rezultatiData) => {
        setRezultati(rezultatiData);
      })
    }, []);

    return (
    <div class="flex h-screen">
        <div class="grid m-auto place-items-center">
            <h1>Poišči izdelek</h1>
            <div class="mb-3 xl:w-96">
                <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                    <input ref={textInput} type="text" onChange={handleChange} value={message} class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3" />
                    <button onClick={onOnclickHandler} class="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Search</button>
                </div>
            </div>
            <h2>Izbrani izdelki</h2>
            <div class="max-w-lg">
                
                <Carousel cols={3} rows={1} gap={10} loop>
                    {rezultati.map((rezultat, index) => {
                      if(index > 1 && index < 11){
                        return (
                          <Carousel.Item>
                              <a href={"/item?id=" + rezultati[index]["id_izdelek"]} >
                                  <img width="100%" class="object-fill" src={"https://www.mlacom.si/en" + rezultati[index]["Slika"]} />
                              </a>
                          </Carousel.Item>
                      );
                      }
                    })}
                </Carousel>
            </div>
        </div>
    </div>
  );
};
  
export default Home;