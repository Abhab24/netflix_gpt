import { useSelector } from "react-redux";
import lang from "../utils/LanguageConstants";

//its working starts after selecting language and updating that language in redux store
//gets selcetd language from redux and then renders its text translations using : 
//lang[langkey].the text u want to translate
//langkey is the selected language comes from redux(its the identifier of selected language)
// then translations for that language come from lang array in languageconstants.js 
const GPTSearchBar = () => {
  const langkey= useSelector(store=>store.config.lang);//retreives the selected language from redux

  //Based on the selected language, it dynamically renders the search bar with the appropriate language-specific placeholders and button text
  return (//lang from language constants.js
    <div className="pt-[10%] flex justify-center">
      <form className=" w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langkey].gptsearchplaceholder}
        />
        <button className=" col-span-3 m-4 px-4 py-2 bg-red-700 rounded-lg text-white">
          {lang[langkey].search}
          </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
