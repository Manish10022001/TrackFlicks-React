import { useEffect, useState } from "react";

import { tempMovieData } from "./data/tempMovieData";

import NavBar from "./components/nav-bar/NavBar";
import Main from "./components/main/Main";

import { Logo, Search, NumResults } from "./components/nav-bar/NavBar";

import Box from "./components/main/movielist/Box";
import { MovieList } from "./components/main/movielist/MovieList";
import { Loader } from "./components/main/movielist/Loader";
import WatchedSummary from "./components/main/watchedMovies/WatchedSummary";
import WatchedMovieList from "./components/main/watchedMovies/WatchedMovieList";
import { tempWatchedData } from "./data/tempWatchedData";

const KEY = "b0a4f46f";
const tempQuery = "Interstellar"
export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  {/*
  useEffect(()=>{
    console.log("after initial render -> with dependency array")
  },[])

  useEffect(()=>{
    console.log("after every render -> without dependency array")
  })

  useEffect(()=>{
    console.log("with query as dependency array")
  },[query])

  console.log("C");
  */}

  //async function
  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("")
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        ); //interstellar
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        //erro message if movie not found
        if(data.Response === "False" || !data.Search) throw new Error("Movie not found")
        setMovies(data.Search);

        //setIsLoading(false); //for it to disappear
      } catch (err) {
        //console.log(err.message);
        setError(err.message);
      } finally{ //finally is used so that Loading... disappears otherwise both error msg and loading appears on screen
        setIsLoading(false); //for it to disappear
      }
    }
    if (query.length <3){
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

  //after useEffect, want to add simple loading indicator, so show movies are loading, 1.create state 2.call it in useEffect, 3. call it in App with condition and create simple component
  //after loader we handled errors using try catch.
  //now synchronize queris with movie data - so create we lift tthe state up from search component and pass props
  return (
    <div>

      <NavBar query={query} setQuery={setQuery}>
        {/* <Logo />
        <Search />   this is also ok*/}
        <NumResults movies={movies} />
      </NavBar>
      {/* <Main movies={movies}> longer needed after giving children same for NavBar*/}

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!error && !isLoading && <MovieList movies={movies} />}
          {error && <ErrorMessage message = {error}/>}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
        {/* <WatchedBox /> */}
      </Main>
    </div>
  );
}

function ErrorMessage({ message}) {
  return (
    <div className = "error">
      <span>⛔</span>
      {message}
    </div>
  );
}
