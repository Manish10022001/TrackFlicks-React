import { useState } from "react";
import { tempWatchedData } from "../../../data/tempWatchedData";

import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovieList } from "./WatchedMovieList";
//now for watched movies
export function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  // const avgImbdRating = average(watched.map((movie) => movie.imdbRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime));
  // const avgUserRating = average(watched.map((movie) => movie.userRating));
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setIsOpen2((open) => !open);
        }}
      >
        {isOpen2 ? "-" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}