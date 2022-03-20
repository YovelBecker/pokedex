import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/Pokemon/PokemonList';
import Home from './views/Home';
import SelectRegion from './components/Regions/SelectRegion';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/region" element={<App />} >
        <Route path="" element={<SelectRegion />} />
        <Route path=":regionId" element={<PokemonList />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);