const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

export default function WatchedSummary({ watched }) {
  const avgImbdRating = average(watched.map((movie) => movie.imdbRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movie</span>
        </p>
        {/* for average, we do some calculation above */}
        <p>
          <span>⭐️</span>
          <span>{avgImbdRating.toFixed(2)}</span>{" "}
          {/*.toFixed(2) => make decimal point to 2 eg. 2.22  */}
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} </span>
        </p>
      </div>
    </div>
  );
}
