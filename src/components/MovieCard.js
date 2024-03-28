import { IMG_CDN } from "../utils/constants";

//its a child compo of MovieList compo and is getting props from it
//renders(has) an image for each movie
const MovieCard = ({posterPath}) => {//prop is coming from MovieList compo which is getting props(movies data) from secondaryconatienr which is getting data from redux
    return (
      <div className="w-48 pr-4">
       <img alt="Movie Card"
       src={IMG_CDN + posterPath} /> 
      </div>
    )
  };
  
  export default MovieCard;
  