import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import RegionList from './components/Regions/RegionList';
import { Region } from './models/Region';
import pokeService from './services/pokeService'

function App() {

  const [regions, setRegions] = useState<Region[]>([]);
  const [currRegion, setCurrRegion] = useState<string | number>(0);

  useEffect(() => {
    const loadRegions = async () => {
      const { regions, pokemonsMap } = await pokeService.getData();
      setCurrRegion(Object.keys(pokemonsMap)[0])
      setRegions(regions)
    }
    loadRegions();
  }, [])

  const changeRegion = (regionId: number | string) => {
    if (regionId === currRegion) return
    setCurrRegion(regionId)
  }

  return (
    <div className="app">
      <Header />
      {regions &&
        <RegionList
          currRegion={currRegion}
          changeRegion={changeRegion}
          regions={regions} />
      }
      <Outlet />
    </div>
  );
}

export default App;
