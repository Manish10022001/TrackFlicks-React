
export default function NavBar({ children, query, setQuery }) {
  //const [query, setQuery] = useState("");

  return (
    // <Logo />
    // <Search />
    //<NumResults movies={movies} />
    <nav className="nav-bar">
      {/* <Logo />
          <Search />
          <NumResults movies={movies} /> */}
      <Logo />
      <Search query={query} setQuery={setQuery}/>
      {children}
    </nav>
  );
}
export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>TrackFlicks</h1>
    </div>
  );
}
export function Search({query, setQuery}) { //, m1: after error handle, lift state up and pass props
  //const [query, setQuery] = useState("");
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
export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
