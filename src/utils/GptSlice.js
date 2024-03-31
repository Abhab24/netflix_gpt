import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({//we just want to add the fetched movies data in this slice so we have only 1 add reducer for that
  name: "Gpt",
  initialState: {
    showGptPage:false//bool value
  },
  reducers: {
    toggleGptPageView:(state)=>{//to show and hide gpt search compo
   state.showGptPage=!state.showGptPage;
    },
  },
});

export default GptSlice.reducer; //reducer
export const {toggleGptPageView} = GptSlice.actions; //actions
