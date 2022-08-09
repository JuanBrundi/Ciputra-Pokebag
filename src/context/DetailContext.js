import { createContext, useState } from "react";
import axios from "axios";

//Config
import { API } from "../utils";

export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [pokeDetail, setPokeDetail] = useState({
    name: "",
    abilities: [],
    types: [],
    moves: [],
    sprites: {
      front_default: ""
    }
  });
  const [fetching, setFetching] = useState(true);

  // Handlers
  const getDetail = async (name) => {
    setFetching(true)
    await API().get(`/pokemon/${name}`)
      .then(res => {
        // setTimeout(() => {
          setPokeDetail(res)
        // }, 3000)
      })
      .catch(err => console.log("Error when fetchingPokemon detail", err))
      .finally(() => {
        setTimeout(() => {
          setFetching(false)
        }, 3000)
      })
  }
  return (
    <DetailContext.Provider value={{ pokeDetail, getDetail }}>
      {children}
    </DetailContext.Provider>
  )
}