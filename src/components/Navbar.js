import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const match = (currentPath) => {
    return currentPath == pathname
  }
  return <div className="nav-container">
    <a href="/" className={`anchor`}>
      Home
    </a>
    <a href="/pokebag" className={` ${match("/pokebag") ? "hide" : "anchor"}`}>
      Pokebag
    </a>
  </div>
}

export default Navbar;