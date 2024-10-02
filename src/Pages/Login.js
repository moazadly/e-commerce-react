import React, { useState } from "react";
import Styles from "./LoginSignup.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <div className={Styles["login-signup"]}>
      <div className={Styles["login-signup-container"]}>
        <h1>Login</h1>
        {error && <p>{error}</p>}

        <form className={Styles["login-signup-fields"]} onSubmit={handleSignup}>
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
          <button type="submit">Login</button>
        </form>

        <p className={Styles["login-signup-login"]}>
          don't have an account?{" "}
          <Link to="/signup">
            {" "}
            <span>signup Here</span>
          </Link>
        </p>
      </div>
      {isAuthenticated && navigate("/")}
    </div>
  );
};

export default Login;
