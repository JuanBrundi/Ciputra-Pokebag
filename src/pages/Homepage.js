import { useContext, useEffect, useState } from "react";

//Context
import { HomepageContext } from "../context";

//Components
import { Card, LoadingCard } from "../components";

const RenderCard = ({ name, url }) => {
  const { getImage } = useContext(HomepageContext)

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const getImageHandler = () => {
    getImage(url, (img) => {
      if (img) setImage(img)

      setLoading(false)
    })
  }

  useEffect(() => {
    getImageHandler()
  }, [])

  if (loading) return null
  return (
    <Card name={name} image={image} />
  )
}

const Homepage = () => {
  const { pokemonList, getPokemonList, fetching } = useContext(HomepageContext)

  const pokemonData = pokemonList.results;

  const formulateUrl = () => {
    let url = "";

    if (pokemonList.next) {
      let splitUrl = pokemonList.next.split("?")[1];

      url = "?" + splitUrl
    }

    return url;
  }

  const seeMore = () => {
    let url = formulateUrl()
    getPokemonList("/pokemon/" + url)
  }

  const RenderList = () => {
    return (
      <div className="card-container">
        {
          pokemonData.map((poke, key) => {
            return (<RenderCard name={poke.name} url={poke.url} key={key} />)
          })
        }
      </div>
    )
  }

  const RenderLoading = () => (
    <div className="loading-container">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  )

  useEffect(() => {
    getPokemonList("/pokemon/?limit=10")
  }, [])

  if (!pokemonData.length && fetching) return <RenderLoading />;
  return (
    <div id="homepage">
      <p className="title">Pokedex</p>

      {RenderList()}

      {fetching && <RenderLoading />}

      <button onClick={seeMore}>
        <span>Show More</span>
      </button>
    </div>
  )
}

export default Homepage;