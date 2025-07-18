import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase.js";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(error);
        return;
      } else {
        navigate("/");
        alert("Logged out successfully.");
      }
    } catch (error) {
      alert("Unable to logout.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
      }

      if (!data.user) {
        alert("User needs to login first.");
        navigate("/auth");
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="h-[10vh]">
      <div className="navbar bg-base-100 shadow-md px-12">
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
              <div className="text-center">
                <a className="text-xl font-bold nav-heading">
                  {"<"}
                  <span className="text-green-600">J</span>SP
                  {"/>"}
                </a>
              </div>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
          <a className="text-xl font-bold nav-heading hidden sm:flex">
            {"<"}
            <span className="text-green-600">JSON</span>SharingPlatform{"/>"}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        {user ? (
          <div className="navbar-end">
            <a className="btn" onClick={handleLogout}>
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar-end">
            <a className="btn">Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
