//import { useState } from "react";
//import { tempWatchedData } from "../../data/tempWatchedData";

// import { ListBox } from "./movielist/Box";
// import { WatchedBox } from "./watchedMovies/WatchedBox";
import Box from "./movielist/Box";
//export default function Main({ movies }) {
export default function Main({ children }) {
  // const [watched, setWatched] = useState(tempWatchedData);
  // const [isOpen2, setIsOpen2] = useState(true);

  // const avgImbdRating = average(watched.map((movie) => movie.imdbRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime));
  // const avgUserRating = average(watched.map((movie) => movie.userRating));

  return (
    <div className="main">
      {/* <ListBox movies={movies} />
      {/* watched movies - tempwatcheddata 
      <WatchedBox /> */}
      {children}
    </div>
  );
}
