import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthBox = () => {
  return (
    <div className="w-[15rem] sm:w-[20rem] md:w-[30rem]">
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="auth-tabs"
          className="tab"
          aria-label="Log in"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <Login />
        </div>

        <input
          type="radio"
          name="auth-tabs"
          className="tab"
          aria-label="Sign up"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default AuthBox;
