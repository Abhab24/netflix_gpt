import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser,removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

//1.Sign out button logic
//2.updating user data in redux + unsubscribing from authorization event after unmounting of header compo
//3. jsx
const Header = () => {//give absolute css for header to overlap with body compo
  const dispatch = useDispatch();//used to dispatch actions to the redux store
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);//used to select user data from the redux store
  //console.log(user);

 // 1.SIGN OUT logic
  const handleSignOut = () => {//gets called when user clciks on signout button
    signOut(auth)
      .then(() => {
        //If sign out is successful,the user is not redirected explicitly from this function. Instead, the redirection logic is handled by the onAuthStateChanged listener
      })
      .catch((error) => {
        //else error happened.
        navigate("/Error");
        console.log(error);
      });
  };

    //UPDATING USER DATA IN REDUX STORE ON AUTHENTICATION(CODE FROM FB DOCS)
    //why is this code added in header compo ? as its loadeded on all pages in site so auth can be checked
    useEffect(() => {
   //NEED OF USEEFFECT():each time this compo is loaded the function passed sets up an event listener onAuthStateChanged to track changes in the authentication state
  //useEffect hook is responsible for a) managing the authentication state changes b) updating user data in the Redux store c) handling navigation based on the user's authentication status
  //(event listener onAuthStateChanged to track changes in the authentication state)
//2.
      const unsubscribe = onAuthStateChanged(auth, (user) => {//onauthstate..event has unsubscribe() fn from docs which will be returned(API call)
        //1st argument = auth object which represents the Firebase Authentication service
        //The 2nd argument = callback function that will be called whenever the authentication state changes. This callback receives a user object representing the current user if they are signed in, or null if they are signed out
        if (user) {//if a user object exists
          //if user SIGN IN /UP
          const { uid, email, displayName, photoURL } = user;//info is extracted
          dispatch(//then dispatched to the redux store using adduser action which updates the users data in redux store ...reducer fn(action)
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          ); 
    navigate("/browse");//reloacating user to the browse page using navigate fn
        } else {
          // if User SIGN OUT
          dispatch(removeUser());//no action req in this
          navigate("/");//redirecting to login page again
        }
      });
//UNSUBSCRIBING IS DONE TO REMOVE THIS onAuthStateChanged EVENT FROM THE BROWSER IF HEADER COMPO GETS UNMOUNTED
//unsubscribe function: fn returned by the onAuthStateChanged event listener setup
// USE: this cleanup function is used to perform cleanup tasks when the component unmounts or before it re-renders.
// ADVANTAGE: unsubscribing ensures that the memory associated with those event listeners is freed up, so preventing memory leaks also prevents unnecessary processing associated with handling authentication state changes when the component is no longer in use
      return ()=> unsubscribe();
    }, []);
  
//3. Rendering
  return (
    <div className="absolute w-full px-8 py-2 z-10 flex justify-between">
      <img
        className="w-48 cursor-pointer"
        src={LOGO_URL}
        alt="logo"
      />

      { user && // if we have a user then only show image and signout button
      ( <div className="flex p-2">
        <img
          className="w-12 h-12"
          src={user.photoURL}
          alt="user"
        />
        <button onClick={handleSignOut} className="font-bold p-2 m-3">
          Sign Out
        </button>
      </div>
   )  }
    </div>
  );
};
export default Header;
