import { Movie } from "./Movie";

export function MovieList({ movies , onSelectMovie}) {
  //const [movies, setMovies] = useState(tempMovieData); neet to state lift
  return (
    <ul className="list list-movies">
      {/* If movies is null or undefined, it stops and returns undefined instead of throwing an error. */}
      {/*movie value changes so create state */}
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/> 
      ))}
    </ul>
  );
}
