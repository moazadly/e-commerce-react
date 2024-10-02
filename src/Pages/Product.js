import React, { useEffect, useState } from "react";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import all_product from "../Assets/all_product";

const Product = () => {
  const { productId } = useParams();
  const [product] = useState(
    all_product.find((p) => p.id === parseInt(productId))
  );

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default Product;
