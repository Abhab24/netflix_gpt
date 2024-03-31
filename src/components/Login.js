import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, PHOTO_URL } from "../utils/constants";

//1.Setting the issigninform state variable
//2.form validations 
//3.Sign up logic (+update the fb profile with name,photo )
//4.updating redux store once again with user data for successful auth
//5.Sign in logic

const Login = () => {
  //this state variable is used to make data dynamic in the form so that it can be used for both sign in/up
  const [isSignInForm, setisSignInForm] = useState(true); //by default form will be sign in
  const [errorMessage, seterrorMessage] = useState(null);//for dynamic error message

  const name = useRef(null);//Ref Hooks: used to reference input elements in the form. They allow accessing and manipulating the DOM elements directly
  const email = useRef(null);//so they can be used in validation now
  const password = useRef(null);

  const dispatch = useDispatch();//used to dispatch actions to the redux store

  //1.SETS THE STATE VARIABLE TO DETERMINE WHETHER FORM IS SIGN IN OR UP SO THAT WE CAN THEN UPDATE DATA ACC TO THIS VARIABLE
  //attached to last text in form
  const openSignUp = () => {
    //this fn is called on clicking last text which is intended to change form sign in to sign up and vice versa and then change that text accordingly
    setisSignInForm(!isSignInForm);
  };


  const handleButtonClick = () => {
    //this will have reference to input box inside which there will be a value=___ which will have mail entered on form
   // console.log(email.current.value); //it has value of email entered

    //2. FORM VALIDATION GETTING ERROR MESSAGE (just above sign in/up button)
    const message = checkValidateData(//this fn is in utils(validate.js) uses regex to validate mail and pass
    //returns null if validated else error message written
      email.current.value,
      password.current.value
    );
    seterrorMessage(message);
   // console.log(message);

    if (message) return; //if error message then dont move ahead of this line

    //3.SIGN UP logic (FIREBASE AUTHENTICATION)
    //CREATING USER ACCOUNT IN FIREBASE using email and pass
    if (!isSignInForm) {
      //SIGN UP logic(THIS CODE IS FROM FB DOCS)
      // a new user is created with email,pass
      createUserWithEmailAndPassword( //this is an API
        auth, //imported
        email.current.value,
        password.current.value
      )
        // update the fb profile with name and photo
        .then((userCredential) => {//if response is sucess it will give a user object and signs that user in firebase automatically
          //(AFTER THIS WE CAN SEE A USER IN FB WHEN WE SIGN UP SUCCESSFULLY!!)
          const user = userCredential.user; //user object
         // console.log(user); //entire user object

          //as soon as user is successfully regitsred update profile with name , image
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
          //4. update our store once again
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = user;

              dispatch(//then dispatched to the redux store using adduser action which updates the users data in redux store ...reducer fn(action)
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              ); 
            })
            .catch((error) => {//ye just upr vaale then kz catch hai
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {//ye sbse top vaale then ka catch hai
          //else if there is an error in api it will give error code,message
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } 
    
   //5.  SIGN IN logic (FIREBASE AUTHENTICATION)
    else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // if this api call is successful then user gets Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage); //this gives user not found error
        });
    }
  };


  return (
    //Header compo,img tag,form(name of form,input name,input email,input passwsord,sign up/in button,toggle bw sign in/up) tag
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL} 
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
