import React, { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./spinner";
import { useDebounce } from "react-use";
import Card from "./card";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is missing. Please set VITE_API_KEY.");
}

const API_CONFIG = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [input, setInput] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounce, setdebounce] = useState("");

  const fetchPopularMovies = async (query = "") => {
    setLoading(true);
    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${query}`
        : `${API_URL}/discover/movie?include_adult=false&sort_by=popularity.desc`;
      const result = await fetch(endpoint, API_CONFIG);
      const data = await result.json();
      if (result.ok) setAllMovies(data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies(debounce);
  }, [debounce]);

  useDebounce(
    () => {
      setdebounce(input);
    },
    500,
    [input]
  );
  return (
    <main>
      <div className="pattern"></div>
      <img src="logo(1).png" className="w-10 h-10" alt="logo" />
      <div className="wrapper">
        <header>
          <img src="hero-img.png" alt="hero" />
          <h1 className="text-5xl">
            Dive into lots of <span className="text-gradient">Movies</span>{" "}
            without any hassle!
          </h1>
          <div className="search">
            <div>
              <input
                type="text"
                value={input}
                placeholder="Search squillions of movies"
                onChange={(e) => setInput(e.target.value)}
              />
              <img src="search.svg" alt="search icon" />
            </div>
          </div>
          <h1 className="text-5xl mt-8">All Movies</h1>
        </header>
        <section>
          <div className="all-movies">
            {loading ? (
              <Spinner />
            ) : (
              <ul>
                {allMovies.map((movie) => (
                  <li key={movie.id}>{<Card a={movie} />}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
