import MovieCard from "./MovieCard";

//title of movie list,movies array 
const MovieList = ({ title, movies }) => {//these props are coming from SecondaryContainer compo where useselector is used to fetch movies array from redux store
  if (!movies) {
    return <div>No movies available</div>;
  }
  console.log(movies);
  //Rendering Movie Cards: compo renders the list of movies..uses JSX to map over the movies array and render a MovieCard component for each movie.
//map fn is used to get all the cards for movielist(work: movies array mein har 1 movie ke liye card render karo)
  return (
    <div className="px-6 ">
      <h1 className="py-4 text-3xl text-white">{title}</h1>
      <div className="flex overflow-x-scroll ">
      <div className="flex">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default MovieList;
