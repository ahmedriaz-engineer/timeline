import React from 'react';
import { Button } from 'react-bootstrap';

import './Shop.css';

const Shop = (props) => {

    const { name, price, imageURL } = props.product;


    return (
        <div className='review-container'>

            <div>
                <img src={imageURL} alt="ProductImage" className='review-image' />
            </div>
            <div>
                <h4>{name}</h4><br />
                <p><b>Net Price (BDT): {price}</b></p><br />
                <Button onClick={() => props.handleAddToCart(props.product)} className='card-button' variant="info" id='checkout-btn'>Add to Cart</Button>
            </div>

        </div>



    );
};

export default Shop;