import "./Bookmark.scss";
import bookmarkEmpty from "./../../assets/icon-bookmark-empty.svg";
import bookmarkFull from "./../../assets/icon-bookmark-full.svg";
import { useContext, useEffect, useState } from "react";
import MovieContext from "../../store/movie-context";

const Bookmark = props => {
  const ctx = useContext(MovieContext);
  const [image, setImage] = useState();

  useEffect(() => {
    props.isBookmarked ? setImage(bookmarkFull) : setImage(bookmarkEmpty);
  }, []);

  const clickHandler = () => {
    ctx.bookmarkedShowHandler(props.show);
    if (image === bookmarkFull) {
      setImage(bookmarkEmpty);
    } else {
      setImage(bookmarkFull);
    }
  };

  return (
    <div className="bookmark" onClick={clickHandler}>
      <img src={image} alt="Empty Bookmark" className="bookmark__image" />
    </div>
  );
};

export default Bookmark;
