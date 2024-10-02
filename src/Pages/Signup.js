import React, { useState } from "react";

import Styles from "./LoginSignup.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className={Styles["login-signup"]}>
      <div className={Styles["login-signup-container"]}>
        <h1>Sign Up</h1>
        {error && <p>{error}</p>}

        <form className={Styles["login-signup-fields"]} onSubmit={handleSignup}>
          <input
            type="text"
            className=""
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className=""
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className=""
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>

        <p className={Styles["login-signup-login"]}>
          Already have an account?{" "}
          <Link to="/login">
            {" "}
            <span>Login Here</span>
          </Link>
        </p>

        <div className={Styles["login-signup-agree"]}>
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      {isAuthenticated && navigate("/")}
    </div>
  );
};

export default Signup;
