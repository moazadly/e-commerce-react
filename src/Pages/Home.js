import React from "react";
import Hero from "../Components/Hero/Hero";
import NewCollection from "../Components/NewCollection/NewCollection";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/userSlice";
import { setCart, setUsers, setUser } from "../Redux/cartSlice";

const Home = () => {
  const { loading, error, isAuthenticated, user, users } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  if (isAuthenticated) {
    console.log(users);
    console.log(user);

    dispatch(setUser(user));
    dispatch(setCart(user.cart));
    dispatch(setUsers(users));
  }
  return (
    <div>
      <Hero />
      <NewCollection />
    </div>
  );
};

export default Home;
