import { useEffect, useRef } from "react";
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
      <Search query={query} setQuery={setQuery} />
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
export function Search({ query, setQuery }) {
  //, m1: after error handle, lift state up and pass props
  //const [query, setQuery] = useState("");
  //ref1a->but we have to do it manually and in react we want declarattive code , so we use concept Refs
  {
    /*useEffect(function(){
    const el = document.querySelector(".search");
    console.log(el);
    el.focus(); 
  })*/
  }
  //ref1 b-> automatically focus on input element(search) but now using refs
  //steps, fist call ref as useRef then create variable, then put it in return ref= {var name}, then useeffect to add the effect , in that use .current property
  //ref 1 c -> want to add keypress effect i.e on enter focus should go to input element
  const inputEl = useRef(null); //initial value emplty
  useEffect(function () {
    function callback(e) {
      if(document.activeElement === inputEl.current)
        return; // this is use so that when we click enter , the focus go to input but does not delete the text

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
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
