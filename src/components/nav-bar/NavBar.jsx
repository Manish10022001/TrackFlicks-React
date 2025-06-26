import { useState } from "react";

export default function NavBar({ movies }) {
  //const [query, setQuery] = useState("");

  return (
    <div>
      <div className="nav-bar">
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </div>
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>TrackFlicks</h1>
    </div>
  );
}
function Search() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
