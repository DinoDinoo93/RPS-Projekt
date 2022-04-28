
import React from "react";
import data from "../data.json"

const queryParams = new URLSearchParams(window.location.search)
const indexFromURL = queryParams.get("index")

const Item = () => {
  return (
    <div class="flex h-screen">
        <div class="m-auto max-w-lg">
                {data.resources.map((resource, index) => {
                    if(index == indexFromURL){
                        return (
                            <div>
                            <h1>{ resource.title }</h1>
                            <img width="100%" src={resource.imageUrl} />
                            <h2>{resource.cena}</h2>
                            </div>
                        );
                    }
                })}
        </div>
    </div>
  );
};
  
export default Item;