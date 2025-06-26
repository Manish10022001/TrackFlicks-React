import { useState } from "react";

import { tempMovieData } from "./data/tempMovieData";

import NavBar from "./components/nav-bar/NavBar";
import Main from "./components/main/Main";

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
      <NavBar movies={movies} />
      <Main movies={movies} />
    </div>
  );
}
