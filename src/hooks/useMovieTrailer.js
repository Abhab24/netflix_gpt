import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

//CUSTOM HOOK of VideoBackground compo
//fetch trailer video using IMDB API + updates the store with trailer video data
const MovieTrailer = (movieid) => {
  const dispatch = useDispatch();
  console.log(movieid);

  //1.
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieid + "/videos",
      API_OPTIONS
    );
    const json = await data.json(); //we get a list of videos of that movie
    console.log(json.results);

    //getting only trailer video from list of videos
    const filterdata = json.results.filter((video) => video.type === "Trailer");
    //if trailer is there then take it else take the 1st video from the list
    const trailer = filterdata.length ? filterdata[0] : json.results[0];
    console.log(trailer);
    //2.
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default MovieTrailer;
