import { useEffect, useState } from "react";
export function useMovies(query) {
  const KEY = "b0a4f46f";
  const [movies, setMovies] = useState([]);
  // commented for l3: const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
      // handleCloseMovie(); //to close previous movie details when searching for new one
      fetchMovies();

      //p3c
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
