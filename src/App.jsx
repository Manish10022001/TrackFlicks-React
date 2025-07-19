import {useEffect, useState } from "react";

import { tempMovieData } from "./data/tempMovieData";

import NavBar from "./components/nav-bar/NavBar";
import Main from "./components/main/Main";

import { Logo } from "./components/nav-bar/NavBar";
import { NumResults } from "./components/nav-bar/NavBar";
import { Search } from "./components/nav-bar/NavBar";
//import { ListBox } from "./components/main/movielist/Box";
//import { WatchedBox } from "./components/main/watchedMovies/WatchedBox";
import Box from "./components/main/movielist/Box";
import { MovieList } from "./components/main/movielist/MovieList";

import WatchedSummary from "./components/main/watchedMovies/WatchedSummary";
import WatchedMovieList from "./components/main/watchedMovies/WatchedMovieList";

import { tempWatchedData } from "./data/tempWatchedData";
const KEY = "b0a4f46f";
export default function App() {
  //const [isOpen1, setIsOpen1] = useState(true);//first box
  //const [isOpen2, setIsOpen2] = useState(true);//second box
  //const [movies, setMovies] = useState(tempMovieData); //tempmovie data
  // const [watched, setWatched] = useState(tempWatchedData);

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  //not a right way to fetch data or api
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data.search));

  //use useEffect to register event, event is the function here which contain sideeffect which we want to register, so this function will execute afteer render.
  //second argument pass empty array to useeffect, this means this effect will only execute as component mount
  useEffect(function(){
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
  },[])

  
  return (
    <div>
      {/* <NavBar movies={movies} /> */}
      {/* pass children as prop in navbar jsx. and call components inside it in here <NavBar> ... </NavBar> */}
      {/* and pass children instead of movies prop to it and also insted of components */}
      <NavBar>
        {/* <Logo />
        <Search />   this is also ok*/}
        <NumResults movies={movies} />
      </NavBar>
      {/* <Main movies={movies}> longer needed after giving children same for NavBar*/}

      <Main>
        {/* <ListBox movies={movies} > not needeed after giving below line*/}
        {/* list box and watched box contains same logic so we can create a resuable componet with it , so we change listbox to box and  */}
        {/* now we don't need open1 and open2 , we can just use open state */}
        {/* <ListBox >
          <MovieList movies={movies} />
        </ListBox> */}
        <Box>
          <MovieList movies={movies} />
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
