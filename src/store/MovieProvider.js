import MovieContext from "./movie-context";
import data from "./../assets/data.json";
import { useEffect, useState } from "react";

const MovieProvider = props => {
  const [location, setLocation] = useState("home link");
  const [heading, setHeading] = useState("Recommended for you");
  const [movieData, setMovieData] = useState(data);
  const [searchData, setSearchData] = useState("");

  //Change Location
  const changeLocation = location => {
    setLocation(location);
  };

  //Login Data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleLogin = movieData => {
    setIsLoggedIn(movieData);
    localStorage.setItem("saveLoggedIn", "true");
  };
  useEffect(() => {
    if (localStorage.getItem("saveLoggedIn") === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  //Trending Movies
  const [trendingMovies, setTrendingMovies] = useState();
  const populateTrendingMovies = () => {
    let movies = movieData.filter(movie => movie.isTrending);
    setTrendingMovies(movies);
  };

  //Displayed Shows
  const [displayedShows, setDisplayedShows] = useState();
  const populateDisplayedShows = () => {
    let shows = [];
    if (location === "home link") {
      shows = movieData.filter(show => show.isRecommended);
      setHeading("Recommended for you");
    } else if (location === "movies link") {
      shows = movieData.filter(show => show.category === "Movie");
      setHeading("Movies");
    } else if (location === "tv link") {
      shows = movieData.filter(show => show.category === "TV Series");
      setHeading("TV Series");
    } else if (location === "bookmark link") {
      shows = movieData.filter(show => show.isBookmarked);
      setHeading("Bookmarked Movies");
    } else if (location === "search") {
      shows = movieData.filter(show => show.title.toLowerCase().includes(searchData.toLowerCase()));
      setHeading(`Found ${shows.length} results for '${searchData}'`);
    }
    setDisplayedShows(shows);
  };

  useEffect(() => {
    populateTrendingMovies();
    populateDisplayedShows();
  }, [location, movieData]);

  //Bookmarked Shows
  const bookmarkedShowHandler = title => {
    movieData.forEach(movie => {
      if (movie.title === title) {
        movie.isBookmarked = !movie.isBookmarked;
      }
    });
  };

  const searchHandler = (searchText, location) => {
    setSearchData(searchText);
    setLocation(location);
  };

  const contextPassed = {
    trendingMovies: trendingMovies,
    displayedShows: displayedShows,
    heading: heading,
    isLoggedIn: isLoggedIn,
    toggleLoginHandler: toggleLogin,
    changeLocationHandler: changeLocation,
    location: location,
    bookmarkedShowHandler: bookmarkedShowHandler,
    searchHandler: searchHandler,
    setIsLoggedIn: setIsLoggedIn,
  };

  return <MovieContext.Provider value={contextPassed}>{props.children}</MovieContext.Provider>;
};

export default MovieProvider;
