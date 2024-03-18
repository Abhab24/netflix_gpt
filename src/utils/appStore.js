import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore(//takes a config which takes a reducer having all reducers of slices
{
    reducer:{
        user:userReducer,//slice name:reducer1,2...
    },
}
)

export default appStore;