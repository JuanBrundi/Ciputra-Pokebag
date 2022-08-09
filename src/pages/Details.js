import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//Context
import { DetailContext, GlobalContext } from "../context";

//Components
import { TypeCard, PokeShakeAnimation, Button } from "../components"

const Details = () => {
  const { name } = useParams();
  const { saveNewPokemon } = useContext(GlobalContext)
  const { getDetail, pokeDetail } = useContext(DetailContext)

  const [cathing, setCatching] = useState(false);
  const [showGotchaModa, setShowGotchaModal] = useState(false);
  const [showConfimationModal, setShowConfirmationModal] = useState(false);
  const [nickname, setNickname] = useState("")

  const initDetails = () => {
    getDetail(name)
  }

  const submitMyPokemon = () => {
    if (!nickname) return;

    saveNewPokemon(nickname, pokeDetail.name, pokeDetail.sprites.front_default)
    setShowConfirmationModal(true)
  }

  const closeModal = () => {
    setNickname("")
    setShowConfirmationModal(false)
    setShowGotchaModal(false)
    setCatching(false)
  }

  //Components
  const RenderTypes = () => {
    if (!pokeDetail.types.length) return null;
    return (
      <div className="type-wrapper">
        {
          pokeDetail.types.map((val, idx) => <TypeCard key={idx} type={val.type.name} />)
        }
      </div>
    )
  }

  const RenderMoves = () => {
    if (!pokeDetail.types.length) return null;
    return (
      <div className="bottom-content">
        <p className="title">Moves</p>
        <div className="moves-container">
          {
            pokeDetail.moves.map((val, idx) => <TypeCard key={idx} type={val.move.name} />)
          }
        </div>
      </div>
    )
  }

  const RenderPokeball = () => (
    <div className="pokeball-wrapper">
      <PokeShakeAnimation cathing={cathing} onClick={() => {
        !cathing && setCatching(true)
      }} />
    </div>
  )

  const RenderModalGotcha = () => {
    return <div className="modal-gotcha">
      <div className="backdrop">
        {
          !showConfimationModal ? (
            <div className="nickname-form">
              <p className="title">Gotcha!</p>
              <p className="label">Now enter your {pokeDetail.name} nickname</p>
              <input value={nickname} onChange={(e) => setNickname(e.target.value)} />

              <Button onClick={submitMyPokemon} text="Submit" />
            </div>
          ) : (
            <div className="confirmation-form">
              <p className="title">Your Pokemon is safe and sound in your pokebag.</p>
              <div className="btn-wrapper">
                <Button reverse onClick={closeModal} text="Close" />
                <Button onClick={submitMyPokemon} text="See PokeBag" />
              </div>
            </div>
          )
        }
      </div>
    </div>
  }

  useEffect(() => {
    if (!cathing) return;

    const catchRate = Math.floor(Math.random() * 100);

    if (catchRate <= 30) {
      setTimeout(() => {
        setCatching(false)
      }, 5000)
      return;
    }

    setTimeout(() => {
      setShowGotchaModal(true)
    }, 5000)
  }, [cathing])

  useEffect(() => {
    initDetails()
  }, [])

  return (
    <>
      <div id="detail-wrapper">
        <div className="top-content">
          <p className="name">{pokeDetail.name}</p>
          {RenderTypes()}
          <div className="image-wrapper">
            <img src={pokeDetail.sprites.front_default} alt="..." />
          </div>
        </div>
        {RenderMoves()}
        {!showGotchaModa ? RenderPokeball() : null}
      </div>
      {showGotchaModa ? RenderModalGotcha() : null}
    </>
  )
}

export default Details;