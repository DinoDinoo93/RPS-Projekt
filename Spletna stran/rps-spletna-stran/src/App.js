import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navigation/Navbar.js";
import Footer from "./footer/Footer.js";
import Home from "./pages";
import Item from "./pages/item.js";
import Items from "./pages/listItem.js";
import SearchItems from "./pages/searchItem";

function App() {
  return (
    //<main class="p-4 flex-grow bg-gray-200"><h1>Splish Splash You Are Trash</h1></main>
    <div class="flex flex-col h-screen">
      <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/item' element={<Item />} />
        <Route path='/listItems' element={<Items />} />
        <Route path='/searchItems' element={<SearchItems />} />
      </Routes>
      <Footer />
      </Router>   
    </div>
  );
}

export default App;

