import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PokemonList from './components/Pokemon/PokemonList';
import RegionList from './components/Regions/RegionList';
import pokeService from './services/pokeService'

function App() {

  const [dataMap, setDataMap] = useState<any>({});
  const [currRegion, setCurrRegion] = useState<string | number>(2);

  useEffect(() => {
    const loadRegions = async () => {
      const { regions, pokemonsMap } = await pokeService.getData();
      setCurrRegion(Object.keys(pokemonsMap)[0])
      setDataMap({ regions, pokemonsMap })
    }
    loadRegions();
  }, [])

  const changeRegion = (regionId: number | string) => {
    if(regionId === currRegion) return
    setCurrRegion(regionId)
  }

  return (
    <div className="app">
      <Header />
      {dataMap.regions && <RegionList currRegion={currRegion} changeRegion={changeRegion} regions={dataMap.regions} />}
      {dataMap.pokemonsMap && <PokemonList pokemonsRaw={dataMap.pokemonsMap[currRegion]} />}
    </div>
  );
}

export default App;
