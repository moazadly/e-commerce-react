// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem, loadCart } from "../Redux/cartSlice";
// const Cart = ({ userId, product }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);

//   // Load cart when user logs in or component mounts
//   React.useEffect(() => {
//     dispatch(loadCart(userId));
//   }, [dispatch, userId]);

//   const handleAddToCart = () => {
//     dispatch(addItem({ product, quantity: 1 }));
//   };
//   const { isAuthenticated } = useSelector((state) => state.user);
//   if (!isAuthenticated) {
//     return (
//       <div style={{ height: "83vh", margin: "auto" }}>
//         Please sign in to access your cart.
//       </div>
//     );
//   }
//   return <div>cart</div>;
// };

// export default Cart;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../Redux/cartSlice"; // Import actions
import Styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return (
      <div style={{ height: "83vh", margin: "auto" }}>
        Please sign in to access your cart.
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={Styles.cart}>
      <h1>Your Cart</h1>
      {cart.totalItems > 0 ? (
        <>
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.id} className={Styles.cartItem}>
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
                <div>
                  <h2>{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.new_price}</p>
                  <button
                    className={Styles.btn}
                    onClick={() => dispatch(removeItem({ productId: item.id }))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={Styles.cartSummary}>
            <p>Total Items: {cart.totalItems}</p>
            <p>Total Price: ${cart.totalPrice}</p>
            <button
              className={Styles.btn}
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
