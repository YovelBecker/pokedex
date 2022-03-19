export interface IPokemonRaw {
  pokedexId: number,
  url: string
}

export interface IPokemonItem {
  pokedexId: number,
  name: string,
  weight: string,
  height: string,
  img: string,
  types: PokemonType[],
  baseExp: number,
  abilities: PokemonAbility[],
  stats: Stat[],
  moves: Move[]
}

type PokemonType = {
  name: string,
  url: string
}

type Ability = {
  name: string,
  url: string
}

type PokemonAbility = {
  ability: Ability,
  isHidden: boolean,
  slot: number
}

type Stat = {
  baseStat: number,
  effort: number,
  name: string,
  url: string,
}

type Move = {
  name: string,
  url: string,
  versionGroupDetails: any[]
}

