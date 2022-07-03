import "./NavBar.scss";
import logo from "./../../assets/logo.svg";
import profile from "./../../assets/image-avatar.png";
import home from "./../../assets/icon-nav-home.svg";
import movies from "./../../assets/icon-nav-movies.svg";
import tv from "./../../assets/icon-nav-tv-series.svg";
import bookmark from "./../../assets/icon-nav-bookmark.svg";
import { useContext, useState } from "react";
import MovieContext from "../../store/movie-context";

const NavBar = () => {
  const ctx = useContext(MovieContext);
  const [selected, setSelected] = useState(false);

  const clickHandler = e => {
    ctx.changeLocationHandler(e.target.alt);
    if (e.target.alt === ctx.location) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const logoutHandler = () => {
    ctx.setIsLoggedIn(false);
    localStorage.clear();
  };

  const navLinks = [
    { name: "home", link: home, selected: ctx.location === "home link" },
    { name: "movies", link: movies, selected: ctx.location === "movies link" },
    { name: "tv", link: tv, selected: ctx.location === "tv link" },
    { name: "bookmark", link: bookmark, selected: ctx.location === "bookmark link" },
  ];
  const links = navLinks.map(nav => {
    return (
      <button className={`nav__link ${nav.selected && "nav__linkSelected"}`} key={nav.name}>
        <img src={nav.link} alt={`${nav.name} link`} className="nav__link-img" onClick={clickHandler} />
      </button>
    );
  });

  return (
    <nav className="nav">
      <img className="nav__image" src={logo} alt="Logo" />
      <div className="nav__group">{links}</div>
      <div className="nav__profile-container">
        <img src={profile} alt="Profile Image" className="nav__profile" onClick={logoutHandler} />
        <span className="nav__logout">Logout</span>
      </div>
    </nav>
  );
};

export default NavBar;
