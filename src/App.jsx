import { useState } from "react";
export default function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <div>
        <div className="nav-bar">
          <div className="logo">
            <span role="img">🍿</span>
            <h1>TrackFlicks</h1>
          </div>
          <input
            className="search"
            type="text"
            placeholder="search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="num-results">
            Found <strong>x</strong> results
          </p>
        </div>
      </div>
    </>
  );
}
