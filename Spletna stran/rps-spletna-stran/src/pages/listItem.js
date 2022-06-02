
import React, { useEffect, useState } from "react";
  
const Items = () => {
  const [rezultati, setRezultati] = useState([]);
  const [cene, setCena] = useState([]);
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
      <div class="container flex justify-center mx-auto my-10">
        <div class="flex flex-col">
          <div class="w-full">
            <div class="border-b border-gray-200 shadow">
              <table class="table-auto">
                <thead class="bg-primary">
                  <tr>
                    <th class="px-6 py-2 text-xs text-gray-500">Naziv</th>
                    <th class="px-6 py-2 text-xs text-gray-500">Cena</th>
                    <th class="px-6 py-2 text-xs text-gray-500">Gumb</th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {rezultati.map((rezultat, index) => (
                    <tr class="whitespace-nowrap">
                      <td class="px-6 py-4 text-sm text-gray-500">{rezultati[index]["Naziv"]}</td>
                      <td class="px-6 py-4 text-sm text-gray-500">{
                        returnPrice(index)}€</td>
                      <td class="px-6 py-4 text-sm text-gray-500"><a class="px-4 py-1 text-sm text-white bg-primary rounded" href={"/item?id=" + rezultati[index]["id_izdelek"]}>Poglej</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Items;