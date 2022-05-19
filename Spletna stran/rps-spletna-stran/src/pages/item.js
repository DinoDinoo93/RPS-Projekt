
import React from "react";
import data from "../data.json"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const queryParams = new URLSearchParams(window.location.search)
const indexFromURL = queryParams.get("index")


const Item = () => {
  return (
    <div class="flex h-screen bg-slate-200">
        <div class="m-auto max-w-3xl">
          
                {data.izdelki.map((izdelek, index) => {
                    if(index == indexFromURL){
                        return (
                          <div>
                            <div class="flex flex-row">
                              <div>
                              <img width="50%" src={izdelek.slika} />
                              <h2>{izdelek.cena}</h2>
                              </div>
                              <div class="container mx-auto bg-white">
                                <div class="text-center">
                                  <h1>{ izdelek.naziv }</h1>
                                  
                                </div>
                                <img src="https://www.mimovrste.com/_nuxt/img/LogoSl10SI.e860cb9.543.svg"></img>
                              </div>
                            </div>
                            <div>
                                <LineChart
                                  width={500}
                                  height={300}
                                  data={izdelek.zgodovinaCen}
                                >
                                <XAxis dataKey="datumCas" />
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