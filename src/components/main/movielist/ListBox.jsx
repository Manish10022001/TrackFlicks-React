import { useState } from "react";
import { MovieList } from "./MovieList";

//removie movie prop, and call children to resolve prop drilling
export function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  //const [movies, setMovies] = useState(tempMovieData);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setIsOpen1((open) => !open);
        }}
      >
        {isOpen1 ? "-" : "+"}
      </button>
      {/* <MovieList movies={movies} /> no longer needed -children used instead paste it in app, listbox component as children*/}
      {isOpen1 && children} 
    </div>
  );
}