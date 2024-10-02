import React from 'react'

import Styles from './NewCollection.module.css';

import new_collections from './../../Assets/new_collections';
import Card from '../Card/Card';

const NewCollection = () => {
  return (
    <div className={Styles["new-collection"]}>
        <h1>New Collection</h1>

        <hr />

        <div className={Styles.collection}>
            {new_collections.map((item, i) => {
                return <Card key={i} name={item.name} id={item.id} old_price={item.old_price} new_price={item.new_price} img={item.image} />
            })}
        </div>
    </div>
  )
}

export default NewCollection