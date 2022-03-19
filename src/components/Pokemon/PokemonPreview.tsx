import React from 'react'
import { IPokemonItem } from '../../models/Pokemon'

export default function PokemonPreview({ pokemon, idx }: { pokemon: IPokemonItem, idx:number }) {
  const buildPokedexId = (num: number) => {
    if (num < 10) return `00${num}`;
    else if (num < 100) return `0${num}`;
    else return num;
  }

  return (
    <div key={pokemon.pokedexId} className={`pokemon-preview-container pokemon-type-${pokemon.types[0].name}`}>
      <h4>{pokemon.name}</h4>
      <p className="pokedex-id">#{buildPokedexId(idx)}</p>
      <div className="pokemon-types-container">
        {pokemon.types.map((type, idx) => (
          <div key={idx} className="pokemon-type">
            {type.name}
          </div>
        ))}
      </div>
      <img src={pokemon.img} alt={pokemon.name} />
    </div>

  )
}
