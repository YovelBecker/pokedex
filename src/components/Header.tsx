import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const navigate = useNavigate();

  return (
    <header>
      <div className="header-nav">
        <img onClick={() => navigate('/')} src={require('../assets/img/back_arrow.png')} alt="" />
        <img src={require('../assets/img/menu.png')} alt="" />
      </div>
      <img
        className="pokeball"
        src={require('../assets/img/pokeball.png')}
        alt="pokeball" />
      <h1>pokedex</h1>
    </header>
  )
}
