import React from "react";

const Card = ({ a }) => {
  return (
    <div className="movie-card">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={
            a.poster_path
              ? `https://image.tmdb.org/t/p/w500/${a.poster_path}`
              : a.poster_url
              ? `${a.poster_url}`
              : "No-Poster.png"
          }
          alt="POSTER"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {a.title}
          </h3>
        </a>

        <div className="content mb-10">
          <div className="rating">
            <img src="star.svg" alt="starSVG" />
            <p>{a.vote_average ? a.vote_average.toFixed(1) : "NA"}</p>
            <span className="text-2xl text-center">-</span>
            <p className="lang">{a.original_language}</p>
            <span className="text-2xl text-center">-</span>
            <p className="year">
              {a.release_date ? a.release_date.split("-")[0] : "NA"}
            </p>
          </div>
        </div>

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          ></svg>
        </a>
      </div>
    </div>
  );
};
export default Card;
