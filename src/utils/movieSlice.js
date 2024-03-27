import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({//we just want to add the fetched movies data in this slice so we have only 1 add reducer for that
  name: "movie",
  initialState: {
    nowPlayingMovies: null, //initialy null
    trailerVideo:null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;//so whatever comesz in action.playload we add it in nowplayingmovies
    },
    addTrailerVideo:(state,action)=>{
        state.trailerVideo=action.payload;
    }
  },
});

export default movieSlice.reducer; //reducer
export const {addNowPlayingMovies,addTrailerVideo} = movieSlice.actions; //actions
