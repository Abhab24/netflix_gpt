import { useSelector } from "react-redux";
import MovieList from "./MovieList";

//parent compo of MovieList and MovieCard components
//it gets data from redux store then passes it to MovieList compo which then passes it to MovieCard compo
//secondarycontainer--->movielist--->moviecard
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies); //getting movies array from redux
  console.log(movies);

  if (!movies) return null; // Return early if movies or nowPlayingMovies is null

  return (
    //main container(whitebg)-secondary container(blackbg)-child container(nobg,this is inside secondary container)
    //so we are moving the child container above so that it slightly overlaps with the main container
    //slice.array
    <div className="bg-black">
      <div className="-mt-36 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.PopularMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
