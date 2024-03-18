import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:null,
  reducers:{
    addUser:(state,action)=>{//on sign in
     return action.payload;//initial state is null so if we return this it will become action.playload
    },
    removeUser:(state,action)=>{//on sign out
     return null;
    }
    
  }
})

export default userSlice.reducer;//reducer
export const {addUser,removeUser} = userSlice.actions;//actions