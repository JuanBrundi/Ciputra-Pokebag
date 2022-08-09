import { useContext, useEffect, useState } from "react";

//Context
import { GlobalContext } from "../context";

//Assets
import { BagCard } from "../components";

const Bag = () => {
  const { getFromLocalStorage, deletePokemon } = useContext(GlobalContext);

  const [list, setList] = useState([])

  const setPokeList = () => {
    const bagList = getFromLocalStorage();

    if (!bagList) return;

    const newPoke = [];

    for (let key in bagList) {
      newPoke.push({
        nick: key,
        name: bagList[key].name,
        image: bagList[key].image
      })
    }

    setList(newPoke)
  }

  const deletePokeList = (nick) => {
    const temp = [...list];
    const newPokelist = temp.filter(val => val.nick != nick)
    setList(newPokelist)
  }

  const deleteList = (nick) => {
    deletePokemon(nick)
    deletePokeList(nick)
  }

  const RenderList = () => {
    if(!list.length) return;

    return (
      <div className="card-container">
        {
          list.map((poke, key) => {
            return (<BagCard deleteList={deleteList} name={poke.name} nick={poke.nick} image={poke.image} key={key} />)
          })
        }
      </div>
    )
  }

  useEffect(() => {
    setPokeList()
  }, [])

  return <div id="bag">
    <p className="title">Pokebag</p>
    {RenderList()}
  </div>
}

export default Bag;