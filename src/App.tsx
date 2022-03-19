import React from 'react';
import Header from './components/Header';
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
    </div>
  );
}

export default App;
