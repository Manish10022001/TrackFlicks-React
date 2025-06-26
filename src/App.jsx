import { useState } from "react";

import { tempMovieData } from "./data/tempMovieData";

import NavBar from "./components/nav-bar/NavBar";
import Main from "./components/main/Main";

import { Logo } from "./components/nav-bar/NavBar";
import { NumResults } from "./components/nav-bar/NavBar";
import { Search } from "./components/nav-bar/NavBar";
import { ListBox } from "./components/main/movielist/ListBox";
import { WatchedBox } from "./components/main/watchedMovies/WatchedBox";
import { MovieList } from "./components/main/movielist/MovieList";

export default function App() {
  //const [isOpen1, setIsOpen1] = useState(true);//first box
  //const [isOpen2, setIsOpen2] = useState(true);//second box
  //const [movies, setMovies] = useState(tempMovieData); //tempmovie data
  // const [watched, setWatched] = useState(tempWatchedData);

  // const avgImbdRating = average(watched.map((movie)=> movie.imdbRating));
  // const avgRuntime = average(watched.map((movie)=> movie.runtime));
  // const avgUserRating = average(watched.map((movie)=>movie.userRating));
  const [movies, setMovies] = useState(tempMovieData);
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
        <ListBox movies={movies} > 
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </div>
  );
}
