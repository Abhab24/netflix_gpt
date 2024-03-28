import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies); //getting all the nowplaying movies from redux store

  if (!movies || movies.length === 0) return null; // Early return if no movies in the store or movies array is empty
  console.log(movies);

  const mainMovie = movies[0]; //but we need only 1 movie info in the maincontainer
  console.log(mainMovie);
  
  const { original_title, overview, id } = mainMovie; //extracting info

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieid={id} />
    </div>
  );
};

export default MainContainer;
