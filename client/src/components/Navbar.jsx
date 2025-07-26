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
                <a href="/" className="text-2xl font-bold nav-heading">
                  {"<"}S<span className="text-green-600">J</span>
                  {"/>"}
                </a>
              </div>
              <li>
                <a href="/dashboard" className="text-lg">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/about" className="text-lg">
                  About
                </a>
              </li>
            </ul>
          </div>
          <a href="/" className="text-xl font-bold nav-heading hidden sm:flex">
            {"<"}
            Share<span className="text-green-600">JSON</span>
            {"/>"}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/about">About</a>
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
