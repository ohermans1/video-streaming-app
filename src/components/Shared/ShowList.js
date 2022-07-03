import { useContext } from "react";
import MovieContext from "../../store/movie-context";
import "./ShowList.scss";
import ShowItem from "./ShowItem";

const ShowList = () => {
  let ctx = useContext(MovieContext);
  let bookmarkedTv = [];
  let bookmarkedMovies = [];
  let bookmark = false;
  let bookmarkAndEmpty = false;

  if (ctx.location === "bookmark link" && ctx.displayedShows.length === 0) {
    bookmarkAndEmpty = true;
  } else {
    bookmarkAndEmpty = false;
  }

  let shows = [];
  if (ctx.displayedShows === undefined) {
    bookmark = false;
    shows = "Loading...";
    return;
  } else if (ctx.location === "bookmark link") {
    bookmark = true;
    let bookmarkedMoviesTemp = ctx.displayedShows.filter(show => show.category === "Movie");
    let bookmarkedTvTemp = ctx.displayedShows.filter(show => show.category === "TV Series");
    bookmarkedMovies = bookmarkedMoviesTemp.map(show => {
      return <ShowItem showData={show} key={show.title} />;
    });
    bookmarkedTv = bookmarkedTvTemp.map(show => {
      return <ShowItem showData={show} key={show.title} />;
    });
    //Just need to make the display of these conditional based on being on the bookmarked page
  } else {
    bookmark = false;
    shows = ctx.displayedShows.map(show => {
      return <ShowItem showData={show} key={show.title} />;
    });
  }

  const bookmarkShowJSX = (
    <>
      <h1 className="show-list__header">Bookmarked TV Series</h1>
      <div className="show-list__item-group">{bookmarkedTv}</div>
    </>
  );

  return (
    <section className="show-list">
      {bookmarkAndEmpty ? (
        <h1 className="show-list__header">Why not bookmark some favorites?</h1>
      ) : (
        <>
          <h1 className="show-list__header">{ctx.heading}</h1>
          <div className="show-list__item-group">{bookmark ? bookmarkedMovies : shows}</div>
          {bookmark && bookmarkShowJSX}
        </>
      )}
    </section>
  );
};

export default ShowList;
