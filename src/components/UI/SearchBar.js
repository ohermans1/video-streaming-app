import "./SearchBar.scss";
import search from "./../../assets/icon-search.svg";
import { useContext, useState } from "react";
import MovieContext from "../../store/movie-context";

const SearchBar = () => {
  const ctx = useContext(MovieContext);
  const [searchText, setSearchText] = useState("");

  const inputHandler = e => {
    setSearchText(e.target.value);
  };

  const enterPressHandler = e => {
    if (e.code === "Enter") {
      ctx.searchHandler(searchText, "search");
      setSearchText("");
    }
  };

  const clickHandler = () => {
    if (searchText.length < 1) {
      console.log("less");
      return;
    }
    ctx.searchHandler(searchText, "search");
    setSearchText("");
  };

  return (
    <div className="search">
      <button className="search__button" onClick={clickHandler}>
        <img src={search} alt="Search Icon" className="search__image" />
      </button>
      <div className="search__text-group">
        <input className="search__text" placeholder="Search for movies or TV series" onInput={inputHandler} value={searchText} onKeyDown={enterPressHandler} />
        <hr className="search__line" />
      </div>
    </div>
  );
};

export default SearchBar;
