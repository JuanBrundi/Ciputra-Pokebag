const Card = ({ name, image }) => {
  return (
    <a href={`/${name}`} className="card-href">
      <div className="card-wrapper">
        <span>{name}</span>
        <img src={image} alt="..." />
      </div>
    </a>
  )
}

export default Card;