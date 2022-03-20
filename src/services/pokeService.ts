import httpService from './httpService';
import { Region } from '../models/Region';
import { IPokemonItem, IPokemonRaw } from '../models/Pokemon';

let pokemonsMap: any;
let regions;

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
  pokemonsMap = acc.pokemonsMap;
  regions = acc.regions;
  return acc
}

function getPokemonList(pokemon_entries: any) {
  const pokemons = pokemon_entries.map((pokemon: any, idx: number) => {
    return { pokedexId: idx, url: pokemon.pokemon_species.url }
  });
  return pokemons
}

async function getPokemonData(pokemonsRaw: IPokemonRaw[]) {
  const pokemonsDataPrms = pokemonsRaw.map(pokemon => {
    const url = pokemon.url.slice(0, pokemon.url.length - 1)
    const startIdx = url.lastIndexOf('/')
    const pokedexId = +url.slice(startIdx + 1)
    return httpService.get(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`);
  })
  const pokemonsData = await Promise.all(pokemonsDataPrms)
  const pokemons = pokemonsData.map((pokemonData: any) => {
    const types = pokemonData.types.map(({ type }: any) => type);
    const name = pokemonData.name;
    const img = pokemonData.sprites.other['official-artwork'].front_default;
    const weight = pokemonData.weight;
    const stats = pokemonData.stats.map(({ base_stat: baseStat, effort, stat: { name, url } }: any) => {
      return {
        baseStat,
        effort,
        name,
        url
      }
    })
    const moves = pokemonData.moves.map(({ move, version_group_details }: any) => {
      const versionGroupDetails = version_group_details.map((version: any) => {
        return {
          levelLearnedAt: version.level_learned_at,
          moveLearnMethod: version.move_learn_method,
          versionGroup: version.version_group
        }
      })
      return {
        ...move,
        versionGroupDetails
      }
    });
    const pokedexId = pokemonData.id;
    const height = pokemonData.height;
    const baseExp = pokemonData.base_experience;
    const abilities = pokemonData.abilities.map(({ ability, is_hidden: isHidden, slot }: any) => {
      return {
        ability,
        isHidden,
        slot
      }
    });
    return {
      pokedexId,
      name,
      weight,
      height,
      img,
      types,
      baseExp,
      abilities,
      stats,
      moves
    }
  })

  return pokemons
}

const pokeService = { getData, getPokemonData }

export default pokeService ;