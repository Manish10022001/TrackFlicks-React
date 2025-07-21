import { useEffect, useState } from "react";

import { tempMovieData } from "./data/tempMovieData";

import NavBar from "./components/nav-bar/NavBar";
import Main from "./components/main/Main";

import { Logo, Search, NumResults } from "./components/nav-bar/NavBar";

import Box from "./components/main/movielist/Box";
import { MovieList } from "./components/main/movielist/MovieList";
import { Loader } from "./components/main/movielist/Loader";
import WatchedSummary from "./components/main/watchedMovies/WatchedSummary";
import WatchedMovieList from "./components/main/watchedMovies/WatchedMovieList";
import { tempWatchedData } from "./data/tempWatchedData";

import StarRating from "./StarRating"
const KEY = "b0a4f46f";
const tempQuery = "Interstellar";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); //s1
  {
    /*
  useEffect(()=>{
    console.log("after initial render -> with dependency array")
  },[])

  useEffect(()=>{
    console.log("after every render -> without dependency array")
  })

  useEffect(()=>{
    console.log("with query as dependency array")
  },[query])

  console.log("C");
  */
  }

  //s4 now need to do little prop drilling
  function handleSelectMovie(id) {
    //setSelectedId(id); c4: below code: if we click on the same movie again then aslo it should close so 
    setSelectedId((selectedId)=>(id===selectedId)? null : id);
  }

  //c1 pass it as prop to movie details(prop drilling)
  function handleCloseMovie(){
    setSelectedId(null);
  }
  //async function
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          ); //interstellar
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          //erro message if movie not found
          if (data.Response === "False" || !data.Search)
            throw new Error("Movie not found");
          setMovies(data.Search);
          console.log(data.search);
          //setIsLoading(false); //for it to disappear
        } catch (err) {
          //console.log(err.message);
          setError(err.message);
        } finally {
          //finally is used so that Loading... disappears otherwise both error msg and loading appears on screen
          setIsLoading(false); //for it to disappear
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  //after useEffect, want to add simple loading indicator, so show movies are loading, 1.create state 2.call it in useEffect, 3. call it in App with condition and create simple component
  //after loader we handled errors using try catch.
  //now synchronize queris with movie data - so create we lift tthe state up from search component and pass props
  //S1->now we need to get details of movie on leftside by selecting movie from right side, so need to create state in app.jsx. Now create new component that component will be displayed if there is selectedId
  //after selecting movie from movie list it should be displayed so we created on eventhandle function and did prop drilling

  //c1=> to handle close button , now we nneed button on clicking selected movie to disappear ,so create event functiona and pass it as prop to moviedetails and create button btn-back in movie details and pass this prop to it
  //d => now want movie details to show when clicked, so for details to show we need to give useEffect for that so that it is show on each mount or render.
  return (
    <div>
      <NavBar query={query} setQuery={setQuery}>
        {/* <Logo />
        <Search />   this is also ok*/}
        <NumResults movies={movies} />
      </NavBar>
      {/* <Main movies={movies}> longer needed after giving children same for NavBar*/}

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!error && !isLoading && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}                              {/*s5 */}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {/* s3 */}
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}/>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
        {/* <WatchedBox /> */}
      </Main>
    </div>
  );
}
//s2
function MovieDetails({ selectedId, onCloseMovie }) {
  //d-5
  const [isLoading, setIsLoading] = useState(false);
 //d-3   
  const [movie, setMovie] = useState({});
  //destructure object
  const {
    Title: title,
    Year : year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  //d-2
  useEffect(function() {
    async function getMovieDetails(){
      setIsLoading(true);
      const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
      const data = await res.json();
      setMovie(data);
      console.log(data);//now to get this data which is invisible in visible part we need to create state
      setIsLoading(false);
    }
    getMovieDetails();
  },[selectedId])
  return (
    <div className="details">
      {
        isLoading ? <Loader /> : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
          {/* {selectedId} */}
        </>
      )}
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>⛔</span>
      {message}
    </div>
  );
}
