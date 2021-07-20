import React from "react";
import Moment from "moment";
import "./index.css";
import { useHistory } from "react-router-dom";

const MovieComponent = (props) => {
  //useHistory for routing path
  let history = useHistory();

  //constant variables
  const IMAGES = "https://image.tmdb.org/t/p/original";
  const NewDate = Moment(props.movie.release_date).format("DD-MM-YYYY");

  //Function to route path
  const changeMovie = () => {
    history.push(`/movie/${props.movie.id}-${props.movie.title}`);
  };

  
  //Display Movies
  const DisplayMovies = () => {
    return (
      <>
        {/* <NavLink to={{pathname:`/movie/${props.id}-${props.title}`}} ></NavLink> */}

        <img
          src={IMAGES + props.movie.poster_path}
          alt={props.movie.title}
          onClick={changeMovie}
        />
        <div><button>Add to Favourite</button></div>
        <div className="movie-info">
          <h3>{props.movie.title}</h3>
          <p>{NewDate}</p>
        </div>
      </>
    );
  };

  //render method
  return (
    <>
     
      <div className="movie">{DisplayMovies()}</div>
    </>
  );
};

export default MovieComponent;
