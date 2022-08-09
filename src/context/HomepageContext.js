import { createContext, useState } from "react";
import axios from "axios";

//Config
import { API } from "../utils";

export const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState({
    count: null,
    next: null,
    previous: null,
    results: []
  });
  const [fetching, setFetching] = useState(true);

  //Handlers
  const getPokemonList = async (url) => {
    setFetching(true)
    await API().get(url)
      .then(res => {
        const newResults = [...pokemonList.results, ...res.results];
        const newList = { ...pokemonList, ...res, results: newResults };
        
        setTimeout(() => {
          setPokemonList(newList)
        }, 3000)
      })
      .catch(err => console.log("Error when fetchingPokemon list", err))
      .finally(() => {
        setTimeout(() => {
          setFetching(false)
        }, 3000)
      })
  }

  const getImage = async (url, cb) => {
    await axios.get(url).then(res => res.data).then(res => cb(res.sprites.front_default, null)).catch(err => cb(null))
  }

  return (
    <HomepageContext.Provider value={{ pokemonList, fetching, getPokemonList, getImage }}>
      {children}
    </HomepageContext.Provider>
  )
}