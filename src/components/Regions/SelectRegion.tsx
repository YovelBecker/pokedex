import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPokemonItem } from '../../models/Pokemon'
import pokeService from '../../services/pokeService'

type StartersMap = {
  [key: string]: IPokemonItem[]
}

export default function SelectRegion() {
  const romans = ['I',
    'II',
    'III',
    'VI',
    'V',
    'VI',
    'VII',
    'VIII']
  const [startersMap, setStartersMap] = useState<StartersMap>({});
  useEffect(() => {
    const getStarters = async () => {
      const startersMap = await pokeService.getStarters();
      setStartersMap(startersMap);
    }
    setTimeout(getStarters, 2000);
  }, [])
  return (
    <>
      {!Object.keys(startersMap).length ?
        <img className="pokeball loader" src={require('../../assets/img/pokeball.png')} alt="pokeball" /> :
        <div className="select-region-container">
          {Object.keys(startersMap).map((gen: string) => {
            const starters = startersMap[gen];
            return (
              <Link key={gen} to={`/region/${gen}`} className="select-region-preview">
                <img
                  className="pokeball"
                  src={require('../../assets/img/pokeball.png')}
                  alt="pokeball" />

                <h4>Generation {romans[(+gen) - 1]}</h4>
                <div className="sprites-container">
                  {starters.map(starter => (
                    <img key={starter.pokedexId} src={starter.img} alt={starter.name} className="sprite" />
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      }
    </>
  )
}
