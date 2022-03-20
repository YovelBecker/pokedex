import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const searchOptions = ['pokedex', 'moves', 'abilities', 'items', 'locations', 'type charts']
  return (
    <div className="homepage-container">
      <img
        className="pokeball"
        src={require('../assets/img/pokeball.png')}
        alt="pokeball" />
      <main>
        <h1>What Pokemon</h1>
        <h1>are you looking for?</h1>
        <div className="search-pokemon">
          <img
            src={require('../assets/img/search.png')}
            alt="search" />
          <input placeholder="Search Pokemon, Move, Ability etc" type="text" />
        </div>
        <div className="search-options-container">
          {searchOptions.map(option => (
            <Link key={option} className="search-option" to="/region">
              <div>
                <div className="circle"></div>
                <img
                  className="pokeball"
                  src={require('../assets/img/union.png')}
                  alt="pokeball" />
                <h4>{option}</h4>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
