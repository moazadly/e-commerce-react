import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/cartSlice"; // Import addItem action
import Styles from "./ProductDetails.module.css";
import star_icon from "../../Assets/star_icon.png";
import star_dull_icon from "../../Assets/star_dull_icon.png";

const ProductDetails = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity: 1 }));
  };

  return (
    <div className={Styles.productDetails}>
      <div className={Styles["productDetails-left"]}>
        <div className={Styles["productDetails-img-list"]}>
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className={Styles["productDetails-main-img"]}>
          <img src={product.image} alt="" />
        </div>
      </div>

      <div className={Styles["productDetails-right"]}>
        <h1>{product.name}</h1>

        <div className={Styles["productDetails-right-stars"]}>
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(250)</p>
        </div>

        <div className={Styles["productDetails-prices"]}>
          <div className={Styles["productDetails-old-price"]}>
            ${product.old_price}
          </div>
          <div className={Styles["productDetails-new-price"]}>
            ${product.new_price}
          </div>
        </div>

        <button onClick={handleAddToCart}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductDetails;
