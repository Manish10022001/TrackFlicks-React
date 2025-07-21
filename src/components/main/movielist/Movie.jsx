export function Movie({ movie, onSelectMovie }) {
  const poster =
    movie.Poster === "N/A"
      ? "https://dummyimage.com/300x445/ccc/000&text=No+Image"
      : movie.Poster;

  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
