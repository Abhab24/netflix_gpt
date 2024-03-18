import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  //give absolute for header to overlap
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);
  console.log(user);

  //SIGN OUT
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // if Sign-out success
        navigate("/");
      })
      .catch((error) => {
        //else error happened.
        navigate("/Error");
        console.log(error);
      });
  };

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
