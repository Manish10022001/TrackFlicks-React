import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {/* now watched.map as we use data from tempwatched data */}
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}