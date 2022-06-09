
import React, { useEffect, useState } from "react";
import data from "../data.json"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const queryParams = new URLSearchParams(window.location.search)
const idFromUrl = queryParams.get("id")
let noveCene = [];

const Item = () => {
  const [rezultati, setRezultati] = useState([]);
  const [cene, setCena] = useState([]);
  const [ceneList, dodajCene] = useState([]);

  async function getRezultati() {
    const res = await fetch(`http://localhost:3001/izdelek`)
    const data = await res.json();
    return data;
  }

  async function getCena() {
    const res = await fetch(`http://localhost:3001/cena`)
    const data = await res.json();
    return data;
  }

  function returnPrice(index) {
    var latestPrice;
    for (let i = 0; i < cene.length; i++) {
      if(rezultati[index]["id_izdelek"] == cene[i]["id_izdelek"]){
        latestPrice = cene[i]["Cena"];
      }
    }
    return latestPrice;
  }

  useEffect(function(){
    getRezultati()
    .then((rezultatiData) => {
      setRezultati(rezultatiData);
    })
    getCena()
    .then((rezultatiData) => {
      setCena(rezultatiData);
    })
  }, []);

  return (
    <div class="flex-grow">
        <div class="m-auto max-w-3xl">
                {rezultati.map((rezultat, index) => {
                    if(rezultati[index]["id_izdelek"] == idFromUrl){
                      noveCene = [];
                        for(let i = 0; i < cene.length; i++){
                          if(cene[i]["id_izdelek"] == rezultati[index]["id_izdelek"]){
                            cene[i]["createdAt"] = cene[i]["createdAt"].substring(0,10);
                            noveCene.push(cene[i]);
                          }
                        }
                        console.log(noveCene);
                        return (
                          /*
                          <div>
                            <div class="flex flex-row">
                              <div>
                              <img width="50%"src={"https://www.mlacom.si/en" + rezultati[index]["Slika"]}/>
                              <h2>{returnPrice(index)}</h2>
                              </div>
                              <div class="container mx-auto bg-white">
                                <div class="text-center">
                                  <h1>{ rezultati[index]["Naziv"] }</h1>
                                </div>
                                <img src="https://www.mlacom.si/en/iimg/67152/1440x256/i.png"></img>
                              </div>
                            </div>
                            <div>
                            </div>
                          </div>
                          */
                          <div>
                            <div class="p-20 bg-purple-100 w-full">
                              <div class="bg-white rounded-lg shadow-lg">
                                <img src={"https://www.mlacom.si" + rezultati[index]["Slika"]} alt="" class="rounded-t-lg p-10"/>
                                  <div class="p-6">
                                    <h2 class="font-bold mb-2 text-2xl text-purple-800">{rezultati[index]["Naziv"]}</h2>
                                    <p class="text-purple-700 mb-2">{rezultati[index]["Opis"].replace(/<[^>]*>?/gm, '')}</p>
                                    <LineChart
                                      width={500}
                                      height={300}
                                      data={noveCene}
                                    >
                                    <XAxis dataKey="createdAt" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="Cena"
                                      stroke="#8884d8"
                                      activeDot={{ r: 1 }}
                                    />
                                </LineChart>
                                    <div class="grid grid-cols-2 divide-x divide-none">
                                      <div><img class="p-2" src="https://www.mlacom.si/iimg/67152/1440x256/i.png"></img></div>
                                      <div class="grid grid-cols-1 divide-y place-items-center">
                                        <div>Cena: {returnPrice(index)} €</div>
                                        <div>
                                          <a href={"https://www.mlacom.si/en/racunalniki/i_" + rezultati[index]["id_izdelek"]} class="bg-primary hover:bg-transparent text-black font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded no-underline">Preveri Izdelek</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
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