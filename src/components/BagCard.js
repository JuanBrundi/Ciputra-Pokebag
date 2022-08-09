import Delete from "../assets/delete.png";

const BagCard = ({ name, nick, image, deleteList }) => {
  return (
    <div className="flag-container">
      <a href={`/${name}`} className="bag-card-href">
        <div className="bag-card-wrapper">
          <div className="left">
            <p className="nick">{nick}</p>
            <p className="name">{name}</p>
          </div>
          <img className="image" src={image} alt="..." />
        </div>
      </a>
      <img onClick={() => deleteList(nick)} className="delete" src={Delete} alt="delete" />
    </div>
  )
}

export default BagCard;