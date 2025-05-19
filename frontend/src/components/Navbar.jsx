import { NavLink, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "../PrivateRoute";

const Navbar = () => {
  const navigate = useNavigate();
  const { notify } = useAuth();

  const { user, logOut } = useAuth();

  const handleLogoutBtn = () => {
    logOut().then(() => {
      navigate("/");
      notify("Logout Sussessful...Goodbye...!!!", "success");
    });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm justify-around mt-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | Navbar</title>
        <link rel="canonical" />
      </Helmet>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allTouristSpot">All Tourist Spot</NavLink>
            </li>
            <li>
              {user ? (
                <NavLink to="/addTouristSpot">Add Tourist Spot</NavLink>
              ) : null}
            </li>
            <li>{user ? <NavLink to="/myList">My List</NavLink> : null}</li>
            <li>
              {user ? <NavLink to="/countries">Country Spots </NavLink> : null}
            </li>
          </ul>
        </div>
        <div>
          <a href="/">
            <img
              title="Cholo Home"
              className="w-18 h-18 rounded-full"
              src="/cholo.svg"
              alt="Cholo Logo"
            />
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allTouristSpot">All Tourist Spot</NavLink>
          </li>
          <li>
            {user ? (
              <NavLink to="/addTouristSpot">Add Tourist Spot</NavLink>
            ) : null}
          </li>
          <li>{user ? <NavLink to="/myList">My List</NavLink> : null}</li>
          <li>
            {user ? <NavLink to="/countries">Country Spots </NavLink> : null}
          </li>
        </ul>
      </div>
      <div>
        {user ? (
          <>
            <div title="" className="flex-none">
              <div className="dropdown dropdown-hover dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle tooltip tooltip-top avatar"
                  data-tip={user?.displayName}
                >
                  <div className="w-full rounded-full border-white border-2">
                    <img
                      src={
                        user?.photoURL
                          ? `${user?.photoURL}`
                          : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-24 lg:w-52 p-2"
                >
                  <li
                    onClick={handleLogoutBtn}
                    className="border-white border-2 cursor-pointer rounded-lg lg:p-2 flex items-center"
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end flex w-fit justify-end">
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
              <h4>or</h4>
              <NavLink className="btn" to="/register">
                Register
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
