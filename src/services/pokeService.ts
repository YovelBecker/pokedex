import httpService from './httpService';
import { Region } from '../models/Region';
import { IPokemonRaw } from '../models/Pokemon';

async function getData() {
  const regs = (await (httpService.get('https://pokeapi.co/api/v2/generation'))).results;
  const gensPrms = regs.map((gen: any) => {
    return httpService.get(gen.url);
  })
  const gens = await Promise.all(gensPrms);
  const regionsPrms = gens.map(gen => {
    return httpService.get(gen.main_region.url);
  })
  const regionsRes = await Promise.all(regionsPrms);
  const acc: any = { regions: [], pokemonsMap: {} }
  for (let i = 0; i < regionsRes.length; i++) {
    const regionData = regionsRes[i];
    const { id, name } = regionData;
    const pokedex = await httpService.get(regionData.pokedexes[0].url)
    acc.regions.push(new Region(id, name))
    acc.pokemonsMap[id] = getPokemonList(pokedex.pokemon_entries);
  }
  return acc
}

function getPokemonList(pokemon_entries: any) {
  const pokemons = pokemon_entries.map((pokemon: any, idx: number) => {
    return { pokedexId: idx, url: pokemon.pokemon_species.url }
  });
  return pokemons
}
