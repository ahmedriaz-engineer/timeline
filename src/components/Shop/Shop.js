import React from 'react';
import { Button, Card, Row, Col, CardGroup } from 'react-bootstrap';
import './Shop.css'

const Shop = (props) => {

    const { name, price, imageURL } = props.product;


    return (
        <div className='product-container  App'>
            <Card className='product-card ' style={{ width: '18rem' }}>
                <Card.Img className='product-image img-fluid' variant="top" src={imageURL} />
                <Card.Body>
                    <Card.Title className='App'><h2>{name}</h2></Card.Title>

                    <div className='footer'>
                        <h5 className='mt-2'>${price}</h5>
                        <Button onClick={()=>props.handleAddCheckout(props.product)}  className='card-button' variant="info" id='checkout-btn'>Add to Checkout</Button>
                    </div>

                </Card.Body>
            </Card>
            
        </div>
    );
};

export default Shop;