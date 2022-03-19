import React, { useEffect, useState } from 'react'
import { IPokemonItem, IPokemonRaw } from '../../models/Pokemon'
import pokemonService from '../../services/pokeService';
import PokemonPreview from './PokemonPreview';

type PokemonListProps = {
  pokemonsRaw: IPokemonRaw[],
}

export default function PokemonList({ pokemonsRaw }: PokemonListProps) {

  const [pokemons, setPokemons] = useState<IPokemonItem[]>([]);

  useEffect(() => {
    const getPokemons = async () => {
      const pokemons: IPokemonItem[] = await pokemonService.getPokemonData(pokemonsRaw);
      setPokemons(pokemons)
    }
    getPokemons();
  }, [pokemonsRaw])


  return (
    <div className='pokemon-list-container'>
      {pokemons.length && pokemons.map((pokemon: IPokemonItem, idx: number) => (
        <PokemonPreview idx={idx + 1} key={pokemon.pokedexId} pokemon={pokemon} />
      ))}
    </div>
  )
}