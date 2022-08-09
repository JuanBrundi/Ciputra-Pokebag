import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const getFromLocalStorage = () => {
    const _myPokemon = localStorage.getItem("my-pokemon");

    if (!_myPokemon) return null;

    const newPokemon = JSON.parse(_myPokemon);

    return newPokemon
  }

  const saveNewPokemon = (nick, name, image) => {
    const currentPokemon = getFromLocalStorage();
    if (!currentPokemon) {
      localStorage.setItem("my-pokemon", JSON.stringify({ [`${nick}`]: { name, image } }))
      return
    }

    let newPoke = { ...currentPokemon };
    newPoke[nick] = { name, image }

    localStorage.setItem("my-pokemon", JSON.stringify(newPoke))
  }

  const deletePokemon = (nick) => {
    console.log(nick, "DEBUG nick")
    const currentPokemon = getFromLocalStorage();

    let newPoke = { ...currentPokemon };
    delete newPoke[nick]

    localStorage.setItem("my-pokemon", JSON.stringify(newPoke))
  }

  return (
    <GlobalContext.Provider value={{ saveNewPokemon, getFromLocalStorage, deletePokemon }}>
      {children}
    </GlobalContext.Provider>
  )
}