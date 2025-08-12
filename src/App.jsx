import { useEffect, useState, useRef } from "react";

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

import StarRating from "./StarRating";

const KEY = "b0a4f46f";
//const tempQuery = "Interstellar";
export default function App() {
  const [movies, setMovies] = useState([]);
  // commented for l3: const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); //s1
  //l3 -> to read data from local storage and load it in the watched list
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue); //json.parse used to removie stringify effect
  });
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
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  //c1 pass it as prop to movie details(prop drilling)
  function handleCloseMovie() {
    setSelectedId(null);
  }
  //w1
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    //l1 -> we do it in useEffect so that is loads one very state update
    //localStorage.setItem("watched",JSON.stringify([...watched, movie]));
  }
  //l2, this stores the movie data in local storage but not visible , so we update it in useState using callback function i.e it will load every movie on state update
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  //r1- function or event to remove movie from watched list
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  // useEffect( function(){
  //   document.addEventListener("keydown", function(e){
  //     if(e.code === "Escape"){
  //       handleCloseMovie();
  //       console.log("Closing");
  //     }
  //   })
  // },[] ) as we press escape again and again it is called even when we have already close the movie, so we apply it in moviedetails, i.e when component is mounted.

  //async function
  useEffect(
    function () {
      //p-3 a
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          ); //interstellar                                    //{signal: controller.signal} p-3b
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          //erro message if movie not found
          if (data.Response === "False" || !data.Search)
            throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
          //setIsLoading(false); //for it to disappear
        } catch (err) {
          //console.log(err.message);
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
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
      handleCloseMovie(); //to close previous movie details when searching for new one
      fetchMovies();

      //p3c
      return function () {
        controller.abort();
      };
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
  //p -> now to change the page title to movie we are currentlly watching, we want to title to appear of the movie selected, so need to make changes in moviedetails component. and as title is outside of component so it is a sideeffect so need to use useEffect.
  //but now if we deselect or return to home page, then also title still remains same, so we need useEffect cleanup function. clean up is simply function that we return from an effect
  //p-3: cleanup data fetching: also need to c
  // leanup data fetching, as right now v r creating too many http request as we search for movies, so we use AbortController it is browser API not of React.

  //e => want to add effect so that by pressing escape(esc) key on laptop, movie details should close, now it is a side effect so we need to use useEffect.
  //w -> watched m;ovie list
  //r -> remove movie from watched list

  //l -> persist the watched list in local storage, do it in 2 parts, 1st watch list state is updated, we'll update the local storage 2nd when app reloads we read that data from local storage and load it in watched list

  //ref 1-> we want the focus on search box when the site reloads or mounts(navbar.jsx)
  //ref 2-> count behind the scenes how many times user clicked different rating before selecting the final one.
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
          )}{" "}
          {/*s5 */}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {/* s3 */}
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched} //w2
              watched={watched}
            /> //w2  //w5- we dont want to repeat the movie in watched list, we just want to change rating, not add it again and again to list, so we pass watched array as prop
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched} //r2-a- here passed as prop becuase it contain the watched movie list and pass prop in watchedmovielist component
              />
            </>
          )}
        </Box>
        {/* <WatchedBox /> */}
      </Main>
    </div>
  );
}
//s2
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  //d-5
  const [isLoading, setIsLoading] = useState(false);
  //d-3
  const [movie, setMovie] = useState({});
  //destructure object
  //w-4a
  const [userRating, setUserRating] = useState("");
  //w-5b , now after this we have to put ternary condition on star rating and add button
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  //W-5 C, to get user rating to show on the button after giving rating
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  //ref 2 a: create new ref
  const countRef = useRef(0);
  //ref 2 b: updating ref using useEfffect, whener userRating changes


  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current++;
   
    },
    [userRating]
  );
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  //w-3
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating, //w4a

      //ref 2 c->function where new movie is added, create new property, tit should return count
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  //d-2
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        //console.log(data);//now to get this data which is invisible in visible part we need to create state
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  //p-1
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "trackFlicks";
        //console.log(`Clean up effect for movie ${title}`)
      };
    },
    [title]
  ); //p-2 cleanup: some time it give undefined we don't want undefined to appear so we give if condition: if no title then just return.
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {/* w-2 */}
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
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
