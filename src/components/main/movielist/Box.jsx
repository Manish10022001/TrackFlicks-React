import { useState } from "react";
import { MovieList } from "./MovieList";

import WatchedMovie from "../watchedMovies/WatchedMovie";

//removie movie prop, and call children to resolve prop drilling
//export function ListBox({ children }) {
export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  //const [movies, setMovies] = useState(tempMovieData);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        {isOpen ? "-" : "+"}
      </button>
      {/* <MovieList movies={movies} /> no longer needed -children used instead paste it in app, listbox component as children*/}
      {isOpen && children}
      {/* isOpen && (
          <WatchedMovieList watched={watched}/>
          <WatchedSummary watched={watched}/> in WatchedBox, if did not make reusable component
        ) */}
    </div>
  );
}

// merged watched box and list box as it contains same logic to make it resuable component
