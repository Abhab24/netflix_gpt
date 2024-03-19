import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser,removeUser } from "../utils/userSlice";

const Header = () => {
  //give absolute for header to overlap
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
  //console.log(user);

 // SIGN OUT
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // if Sign-out success //no need to navigate from here that will be done by onauthstatechange() so it is empty
      })
      .catch((error) => {
        //else error happened.
        navigate("/Error");
        console.log(error);
      });
  };

    //UPDATING USER DATA IN REDUX STORE ON AUTHENTICATION(CODE FROM FB DOCS)
    useEffect(() => {
      //each time this compo is loading(this page is loaded) its checking the auth of the user
      //as we want to use this event listener for once only after compo loads
      const unsubscribe = onAuthStateChanged(auth, (user) => {//onauthstate..event has unsubscribe() fn from docs which will be returned
        //unsubsribing is done to remove this event from site if header compo gets unmounted 
        //API call
        if (user) {
          //if user SIGN IN /UP
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          ); //adding user data to store ..u can add many data
          //reducer fn(action)
    navigate("/browse"); //after creating acc in fb/logging in reloacating user to the browse page using navigate fn

        } else {
          // if User SIGN OUT
          dispatch(removeUser());//no action req in this
          navigate("/");//redirecting to login page again
        }
      });
//unsubscribe when compo unmounts
      return ()=> unsubscribe();//if we call unsubscribe fn it will remove the onauth.. event from our browser

    }, []);
  

  return (
    <div className="absolute w-full px-8 py-2 z-10 flex justify-between">
      <img
        className="w-48 cursor-pointer"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
