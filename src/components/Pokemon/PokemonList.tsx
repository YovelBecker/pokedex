import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IPokemonItem, IPokemonRaw } from '../../models/Pokemon'
import pokemonService from '../../services/pokeService';
import PokemonPreview from './PokemonPreview';

type RouteParams = {
  regionId: string
}

export default function PokemonList() {

  const { regionId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<IPokemonItem[]>([]);

  useEffect(() => {
    if (!regionId) return
    const getPokemons = async () => {
      setPokemons([])
      const pokemonsRaw: IPokemonRaw[] = pokemonService.getPokemons(regionId);
      if (!pokemonsRaw || !pokemonsRaw.length) {
        navigate('/')
        return
      }
      const pokemons: IPokemonItem[] = await pokemonService.getPokemonData(pokemonsRaw);
      setPokemons(pokemons)
    }
    getPokemons();
    return () => { }
  }, [regionId])


  return (
    <>
      {!pokemons.length ?
        <img className="pokeball loader" src={require('../../assets/img/pokeball.png')} alt="pokeball" /> :
        <div className='pokemon-list-container'>
          {pokemons.map((pokemon: IPokemonItem, idx: number) => {
            return (<PokemonPreview idx={idx + 1} key={pokemon.pokedexId} pokemon={pokemon} />)
          })}
        </div>
      }
    </>
  )
}