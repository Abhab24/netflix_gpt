import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({//we just want to add the fetched movies data in this slice so we have only 1 add reducer for that
  name: "movie",
  initialState: {
    trailerVideo:null,
    nowPlayingMovies: null, //initialy null
    PopularMovies:null,
  },
  reducers: {
    addTrailerVideo:(state,action)=>{
      state.trailerVideo=action.payload;
  },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;//so whatever comesz in action.playload we add it in nowplayingmovies
    },
    addPopularMovies: (state, action) => {
      state.PopularMovies = action.payload;//so whatever comesz in action.playload we add it in nowplayingmovies
    },

  },
});

export default movieSlice.reducer; //reducer
export const {addTrailerVideo,addNowPlayingMovies,addPopularMovies} = movieSlice.actions; //actions
