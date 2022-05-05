
import React from "react";
import data from "../data.json"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const queryParams = new URLSearchParams(window.location.search)
const indexFromURL = queryParams.get("index")

const Item = () => {
  return (
    <div class="flex h-screen">
        <div class="m-auto max-w-3xl">
                {data.resources.map((resource, index) => {
                    if(index == indexFromURL){
                        return (
                            <div class="flex flex-row">
                              <div>
                              <h1>{ resource.title }</h1>
                              <img width="100%" src={resource.imageUrl} />
                              <h2>{resource.cena}</h2>
                              </div>
                              <div>
                                <LineChart
                                  width={500}
                                  height={300}
                                  data={resource.zgodovinaCen}
                                >
                                <XAxis dataKey="datumCene" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="cena"
                                  stroke="#8884d8"
                                  activeDot={{ r: 1 }}
                                />
                                </LineChart>
                              </div>
                            </div>
                        );
                    }
                })}
        </div>
    </div>
  );
};
  
export default Item;