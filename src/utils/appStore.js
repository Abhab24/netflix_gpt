import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import GptReducer from "./GptSlice";
import configReducer from "./configSlice"

const appStore = configureStore(//takes a config which takes a reducer having all reducers of slices
{
    reducer:{
        user:userReducer,//slice name:reducer1,2...
        movies:moviesReducer,
        Gpt:GptReducer,
        config:configReducer,
    },
}
)

export default appStore;