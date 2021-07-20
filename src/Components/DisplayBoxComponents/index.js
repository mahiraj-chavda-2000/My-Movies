import React, { useState, useEffect } from "react";
import Moment from "moment";
import "./Display.css";
import { useParams } from "react-router";
import { MovieDBApiKey } from "../../utils/config";
import ReactPlayer from "react-player";

const GetMovieInfo = (props) => {
  const { id } = useParams(); //Id for Display
  const [actors, setActors] = useState([]);
  const [videos, setVideos] = useState([])
  //Movie api
  const GetMovieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${MovieDBApiKey}&language=en-US`;
  const ActorApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${MovieDBApiKey}`;
  const VideoApi = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ffc4e23618d62c1f9b865e732e5ecfcf&language=en-US`;
  //states
  const [info, setInfo] = useState([]);

  //useEffect
  useEffect(async () => {
    await fetchMovieData();
    await fetchActor();
    await fetchVideo();
  }, []);

  //Function For fetch data from api
  const fetchMovieData = async () => {
    fetch(GetMovieApi)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setInfo(data);
      });
  };
  const fetchActor = async () => {
    fetch(ActorApi)
      .then((res) => res.json())
      .then((actdata) => {
        // console.log(actdata.cast);
        setActors(actdata.cast);
      });
  };
  const fetchVideo = async () => {
    fetch(VideoApi)
      .then((res) => res.json())
      .then((videoData) => {
        console.log(videoData.results)
        console.log("video",videoData.results[0].key);
      setVideos(videoData.results[0].key)
    })
  }

  //Function for display data
  const renderDisplayMovieInfo = () => {
    const IMAGES = "https://image.tmdb.org/t/p/original";
    const NewDate = Moment(info.release_date).format("DD-MM-YYYY");
    const releseYear = Moment(info.release_date).format("YYYY");
    return (
      <div>
        <div className="movie_card" id="bright" key={info.id}>
          <div className="info_section">
           
            <div className="movie_header">
              <img
                className="locandina"
                src={IMAGES + info.poster_path}
                alt={props.title}
              />
              <h3>{info.title}</h3>
              <h4>{releseYear}</h4>
              <span className="minutes">{info.runtime} min</span>
              <p className="type">Language : {info.original_language}</p>
            </div>
            <div className="movie_desc">
              <p className="text">{info.overview}</p>
            </div>
            <div className="movie_social">
              <ul>
                <li>
                  <i className="material-icons">share</i>
                </li>
                <li>
                  <i className="material-icons"></i>
                </li>
                <li>
                  <i className="material-icons">chat_bubble</i>
                </li>
              </ul>
            </div>
          </div>
          <div className="blur_back bright_back"></div>
        </div>
      </div>
    );
  };

  const renderActorInfo = () => {
    const IMAGES = "https://image.tmdb.org/t/p/original";

    return actors.map((actor, index) => (
      <div>
        <div className="movie_card" id="bright" key={actor.id}>
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina"
                src={IMAGES + actor.profile_path}
                alt={props.name}
              />
              <h3>{actor.name}</h3>

              <span className="minutes">Popularity :{actor.popularity}</span>
            </div>
          </div>
          {/* <div className="blur_back bright_back"></div> */}
        </div>
      </div>
    ));
  };

  const VideoModal = () => {
    const youtubeUrl = "https://www.youtube.com/watch?v="
    return (
      <div className="video-player">
        <ReactPlayer
          className="react-player"
          url={youtubeUrl + videos }
          width="200%"
          height="150%"
        />
      </div>
    )  
     
      
    }
  //render Method
  return (
    <div className="movie-container">
      {VideoModal()}
      {renderDisplayMovieInfo()}
      {/* {renderActorInfo()} */}
    </div>
  );
};

export default GetMovieInfo;
