
import React from "react";
import Carousel from 'react-grid-carousel'
import data from "../data.json"
const Home = () => {
  return (
    <div class="flex h-screen">
        <div class="m-auto">
            <h1>Poišči izdelek</h1>
            <div class="mb-3 xl:w-96">
                <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                    <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3" />
                    <button class="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Search</button>
                </div>
            </div>
            <div class="max-w-lg">
                <h2>Najbolje iskani izdelki</h2>
                <Carousel cols={3} rows={1} gap={10} loop>
                    {data.resources.map((resource, index) => {
                        return (
                            <Carousel.Item>
                                <a href={"/item?index=" + resource.index} >
                                    <img width="100%" src={resource.imageUrl} />
                                </a>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    </div>
  );
};
  
export default Home;