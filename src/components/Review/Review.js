import React from 'react';
import './Review.css'
import { Button } from 'react-bootstrap';

const Review = (props) => {

    const { name, price, imageURL, quantity, _id } = props.product;
    return (
        <div className='review-container'>

            <div>
                <img src={imageURL} alt="ProductImage" className='review-image' />
            </div>
            <div>
                <h4>{name}</h4>
                <p>Net Price: {price}</p>
                <p>Quantity: {quantity}</p>
                <Button variant='warning' className='card-button' onClick={() => props.removeProduct(_id)}> Remove Item </Button>
            </div>

        </div>

    );
};

export default Review;