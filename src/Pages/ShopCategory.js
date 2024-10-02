import React, { useEffect, useState } from 'react'
import all_product from './../Assets/all_product';

import Styles from './ShopCategory.module.css';
import Card from '../Components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setProductList } from '../Redux/productSlice';
import Loader from '../Components/Loader/Loader';

const ShopCategory = (props) => {
    const { category } = props;

    const dispatch = useDispatch();

    const productState = useSelector(state => state.product);

    console.log(productState);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])


    return (
        <div className={Styles['shop-category']}>
            {productState.loading ? <Loader /> : <div className={Styles["shop-category-products"]}>
                {all_product.map((product, i) => {
                    if (product.category === category) {
                        return <Card key={i} name={product.name} id={product.id} old_price={product.old_price} new_price={product.new_price} img={product.image} />
                    } else return null;
                })}
            </div>}
        </div>
    )
}

export default ShopCategory