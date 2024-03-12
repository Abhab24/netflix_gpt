import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const[isSignInForm,setisSignInForm]=useState(true);//by default form will be sign in
  
  const openSignUp=()=>{
    setisSignInForm(!isSignInForm);
  }

    return (
      <div>
        <Header/>
        <div className="absolute">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg "
            alt="bg"
          />
        </div>
        <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In":"Sign Up"}
            </h1>
            { !isSignInForm && (<input
          type="text"
          placeholder=" Name"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />) }

          <input
            type="text"
            placeholder="    Email or phone number"
            className="py-4 m-0 w-full bg-gray-700 rounded-md"
          />
          <input
            type="password"
            placeholder=" Password"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
          <button className="p-4 my-4 w-full bg-red-700 rounded-md">           
            {isSignInForm ? "Sign In":"Sign Up"}
        </button>
          <input
            type="checkbox"
            placeholder="Remember me"
        
            className="p-2 m-y2 w-full "
          />
          <p className="p-4 m-4 cursor-pointer" onClick={openSignUp}>
          { isSignInForm ? 
          "New to Netflix? Sign Up Now"
          :"Already a User? Sign In Now "}
            </p>
        </form>
      </div>
    );
  };
  export default Login;
  