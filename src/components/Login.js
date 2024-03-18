import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true); //by default form will be sign in
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Sign up/in button ka click handler fn
  const handleButtonClick = () => {
    //FIREBASE AUTHENTICATION OF USER  (validating data in this fn)

    //this will have reference to input box inside which there will be a value=___ which will have mail entered on form
    console.log(email.current.value); //it has value of email entered
    //1. GETTING ERROR MESSAGE (just above sign in/up button)
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    seterrorMessage(message);
    console.log(message);

    if (message) return; //if error message then dont move ahead of this line

    //2.SIGN IN /UP , CREATING USER ACCOUNT IN FIREBASE using email and pass
    if (!isSignInForm) {
      //SIGN UP logic(THIS CODE IS FROM FB DOCS)
      //STEP1: a new user is created with email,pass
      createUserWithEmailAndPassword(
        //this is an API
        auth, //imported
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          //STEP2: update the fb profile with name and photo
          //if response is sucess it will give a user object and signs that user in firebase automatically
          //SO NOW WE CAN SEE A USER IN FB WHEN WE SIGN UP SUCCESSFULLY
          const user = userCredential.user; //user object
          console.log(user); //entire user object

          //TO DISPLAY USERNAME AFTER CREATING ACCOUNT(FB CODE)
          //as soon as user is successfully regitsred update profile with name , image
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4",
          })
            .then(() => {
              //STEP3: update our store once again
              // Profile updated!
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              ); //adding user data to store ..u can add many things
              navigate("/browse"); //after creating acc in fb reloacating user to the browse page using navigate fn
            })
            .catch((error) => {
              // An error occurred
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {
          //else if there is an error in api it will give error code,message
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //3. SIGN IN logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // if this api call is successful then user gets Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse"); //after creating acc in fb reloacating user to the browse page using navigate fn
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage); //this gives user not found error
        });
    }
  };
  // SETS THE STATE VARIABLE TO DETERMINE WHETHER FORM IS SIGN IN OR UP SO THAT WE CAN THEN UPDATE DATA ACC TO THIS VARIABLE
  //attached to last text in form
  const openSignUp = () => {
    //this fn is called on clicking last text which is intended to change form sign in to sign up and vice versa and then change that text accordingly
    setisSignInForm(!isSignInForm);
  };

  return (
    //Header compo,img tag,form(name of form,input name,input email,input passwsord,sign up/in button,toggle bw sign in/up) tag
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg "
          alt="bg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder=" Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="    Email or phone number"
          className="py-4 m-0 w-full bg-gray-700 rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder=" Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <p className="text-red-400 font-bold text-lg m-2 p-2">{errorMessage}</p>

        {/* Sign in/up button has clcik handler fn which will        */}
        <button
          className="p-4 my-4 w-full bg-red-700 rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="p-4 m-4 cursor-pointer" onClick={openSignUp}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already a User? Sign In Now "}
        </p>
      </form>
    </div>
  );
};
export default Login;
