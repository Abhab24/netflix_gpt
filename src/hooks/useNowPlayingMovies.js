import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";

//fetching movies data from tmdb api and updating it with redux store
const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();//for putting data fetched in the store

    //making a Fetch call to this API using GET HTTP method
    
    //note:but if you use fetch without specifying a method, it defaults to a GET request.
    //This means that the Fetch API will make a GET request to the specified URL by default.
      
      // async await is used as we are using fetch call here
      const getNowPlayingMovies = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS
        );//this will return a promise ...gives a response object
    
        const json = await data.json();//(parsing the response)converts data into json from readable stream
        console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
      };
    
      //we will then make an API call inside useeffect so that we can call it only once whenever browse compo is rendered
      useEffect (()=>{
        getNowPlayingMovies();
      },[]);
    
}

export default useNowPlayingMovies;