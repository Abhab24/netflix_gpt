import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer=()=>{
//getting all the nowplaying movies from redux store
    const movies= useSelector(store=>store.movies?.nowPlayingMovies);
     if(movies==null) return;//if nop movie in store then return from here only this is called early return

    const mainMovie = movies[0];//but we need only 1 movie info in the maincontainer
    console.log(mainMovie);

   const {original_title,overview,id} = mainMovie;//extracting info

    return(
        <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieid={id}/>
        </div>
    )
}

export default MainContainer;