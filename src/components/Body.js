import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Error from "./Error";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch(); //for dispatching an action

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/error",
      element: <Error />,
    },
  ]);

  //UPDATING USER DATA IN REDUX STORE ON AUTHENTICATION(CODE FROM FB DOCS)
  useEffect(() => {
    //as we want to use this event listener for once only after compo loads
    onAuthStateChanged(auth, (user) => {
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
      } else {
        // if User SIGN OUT
        dispatch(removeUser()); //no action req in this
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
