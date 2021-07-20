import React, { useState, useEffect, useLayoutEffect } from "react";
import { MovieDBApiKey } from "../utils/config";
import "../Components/MovieBoxComponent/index.css";
import MovieComponent from "../Components/MovieBoxComponent";
import Paginate from "../Components/Pagination/Paginate";
import _ from "lodash";

const Movie = () => {
  //States
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState(1);

  // UseEffect
  useEffect(async () => {
    await fetchMovieData(page);
    console.log("useEffect");
  }, []);

  //UseLayoutEffect
  useLayoutEffect(() => {
    function updatePosition() {
      if (document.getElementById("movieItems")) {
        if (
          window.scrollY + window.innerHeight >=
          document.getElementById("movieItems").offsetHeight
        ) {
          loadMoreData(temp);
          //   window.scrollTo(0, 0);
        }
      }
    }
    window.addEventListener("scroll", updatePosition);
    // updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [movies, page]);

  //Extra functions

  const loadMoreData = async (t) => {
    if (page < t + 1) {
      setPage(t + 1);
      setTemp(page + 1);
      console.log(page);
      // setLoadMore(true)
      fetchMovieData(t + 1);
    }
  };

  // Api methods
  const fetchMovieData = async (page) => {
    // setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MovieDBApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        setIsLoading(false);
        console.log(data);
        setMovies((movies) => movies.concat(data.results));
        // setTemp(page)
        // console.log()
        // setTemp(data.total_pages)

        // setMovies(data.results)
      });
  };

  //Movies Function
  const fetchMovie = () => {
    return (
      <>
   
        {/* {console.log(temp)} */}

        {movies && movies.length > 0 ? (
          <div id="movieItems" className="movie-container">
            {movies.map((movie, index) => (
              <MovieComponent key={index} movie={movie} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="ff_message_no_found mt-4">
              <h4>No Movies found</h4>
            </div>
          )
        )}
        {/* <Paginate  page={page} setPage={setPage} />  */}
      </>
    );
  };

  // Render Mehods
  return (
    <>
    
     <button>Filter</button>
      {fetchMovie()}
    </>
  );
};

export default Movie;
