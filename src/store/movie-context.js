import { createContext } from "react";

const MovieContext = createContext({
  trendingMovies: [{}],
  isLoggedIn: "",
  changeLocationHandler: location => {},
});

export default MovieContext;
