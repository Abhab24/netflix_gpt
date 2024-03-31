import { createSlice } from "@reduxjs/toolkit";

//this slice manages configuration state(eg. selected 'lang')
//this will store the selected language("lang")
//LANGAUGE FEATURE WORKING:
//Initially, the config slice sets the default language to "en" when the Redux store is initialized.
//The GPTSearchBar component retrieves the selected language from the Redux store (langkey).
//Based on the selected language, it dynamically renders the search bar with the appropriate language-specific placeholders and button text using constants.js and languageconstants.js
//When a user changes the language using the language selector, the changeLanguage action is dispatched, updating the selected language in the Redux store.
//As a result, the GPTSearchBar component re-renders with the updated language-specific content, reflecting the language change.

const configSlice = createSlice({
  //we just want to add the fetched movies data in this slice so we have only 1 add reducer for that
  name: "config",
  initialState: {
    lang: "en",
  },
  reducers: {//thies reducer allowws to change the selected language in the store
    changeLanguage: (state, action) => {//this helps to change the selected language in the store
      state.lang = action.payload;
    },
  },
});

export default configSlice.reducer; //reducer
export const {changeLanguage} = configSlice.actions; //actions
