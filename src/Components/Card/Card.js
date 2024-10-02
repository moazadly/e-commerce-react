import React from 'react'

import Styles from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {

    const { img, name, old_price, new_price, id } = props;

    return (
        <div className={Styles.card}>
            <Link to={`/product/${id}`}>
                <img src={img} alt='' />
            </Link>

            <p>{name}</p>

            <div className={Styles["price-new"]}>
                ${new_price}
            </div>

            <div className={Styles["price-old"]}>
                ${old_price}
            </div>
        </div>
    )
}

export default Card