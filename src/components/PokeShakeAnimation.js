const PokeShakeAnimation = ({ cathing, onClick }) => <div onClick={onClick} className={`${cathing ? "pokeball" : "pokeoff"}`}>
  <div className="pokeball__button"></div>
</div>

export default PokeShakeAnimation