import { useContext } from "react";
import MovieContext from "../../store/movie-context";
import "./Trending.scss";
import TrendingItem from "./TrendingItem";

const Trending = () => {
  let ctx = useContext(MovieContext);
  let display = ctx.location === "home link";

  let trendingMovies = [];
  if (ctx.trendingMovies === undefined) {
    trendingMovies = "Loading...";
    return;
  } else if (ctx.location === "bookmark link") {
    console.log("Bookmarked");
  } else {
    trendingMovies = ctx.trendingMovies.map(movie => {
      return <TrendingItem movieData={movie} key={movie.title} />;
    });
  }

  const dragHandler = e => {
    console.log(e);
  };

  return (
    display && (
      <section className="trending">
        <h1 className="trending__header">Trending</h1>
        <div className="trending__item-group" onDrag={dragHandler}>
          {trendingMovies}
        </div>
      </section>
    )
  );
};

export default Trending;
