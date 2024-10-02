import React from 'react'

import Styles from './Hero.module.css';

import hand_icon from '../../Assets/hand_icon.png';
import arrow_icon from '../../Assets/arrow.png';
import right_img from '../../Assets/product_16.png';

const Hero = () => {
    return (
        <div className={Styles.hero}>
            <div className={Styles["hero-left"]}>
                <h2>NEW ARRIVALS ONLY</h2>

                <div className={Styles["hero-hand-icon"]}>
                    <p>new</p>
                    <img src={hand_icon} alt='' />
                </div>

                <p>collection</p>
                <p>for everyone</p>

                <div className={Styles["hero-latest-button"]}>
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt='' />
                </div>
            </div>

            <div className={Styles["hero-right"]}>

                <img src={right_img} alt='' />
            </div>
        </div>
    )
}

export default Hero