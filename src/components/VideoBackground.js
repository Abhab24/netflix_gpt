import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieid }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
 console.log(trailerVideo);
console.log(movieid);
   useMovieTrailer(movieid);

  //how to get this iframe code: go to utube and enter ur movieid in any utube videos url then ull see ur video three then click on share there u can get this code
  return (
    <div className="w-screen">
      <iframe
      className="w-screen aspect-video"
      src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1"}
      title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      

      ></iframe>
    </div>
  );
};

export default VideoBackground;
