import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Styles from "./Navbar.module.css";
import { logout } from "../../Redux/userSlice";

import logo from "./../../Assets/logo.png";
import cart_icon from "./../../Assets/cart_icon.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState("/");
  const dispatch = useDispatch();

  const noDecoration = { textDecoration: "none" };

  // const cartItems = useSelector((state) => state.cart.cart.totalItems);
  const { isAuthenticated } = useSelector((state) => state.user);
  function handlelogout() {
    dispatch(logout());
  }
  return (
    <div className={Styles.navbar}>
      <div className={Styles["nav-logo"]}>
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>

      <ul className={Styles["nav-menu"]}>
        <li onClick={() => setIsActive("/")}>
          <Link style={noDecoration} to="/">
            {" "}
            Shop{" "}
          </Link>{" "}
          {isActive === "/" ? <hr /> : <></>}{" "}
        </li>
        <li onClick={() => setIsActive("/men")}>
          <Link style={noDecoration} to="/men">
            {" "}
            Men{" "}
          </Link>{" "}
          {isActive === "/men" ? <hr /> : <></>}{" "}
        </li>
        <li onClick={() => setIsActive("/women")}>
          <Link style={noDecoration} to="/women">
            {" "}
            Women{" "}
          </Link>{" "}
          {isActive === "/women" ? <hr /> : <></>}{" "}
        </li>
        <li onClick={() => setIsActive("/kids")}>
          <Link style={noDecoration} to="/kids">
            {" "}
            Kids{" "}
          </Link>{" "}
          {isActive === "/kids" ? <hr /> : <></>}{" "}
        </li>
      </ul>

      <div className={Styles["nav-login-cart"]}>
        {!isAuthenticated && (
          <Link style={noDecoration} to="/signup">
            <button> Signup </button>
          </Link>
        )}
        {isAuthenticated && <button onClick={handlelogout}> Logout </button>}
        <Link style={noDecoration} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        {/* <div className={Styles["nav-cart-count"]}>{cartItems}</div> */}
      </div>
    </div>
  );
};

export default Navbar;
