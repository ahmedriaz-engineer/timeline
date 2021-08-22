import React, { useState, useEffect } from 'react';
import Shop from '../Shop/Shop'
import './Home.css'
import { Form, FormControl, Button, } from 'react-bootstrap';
import { useContext } from 'react';
import { productContext } from '../../App';
const Home = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);

    const handleAddCheckout = (product) => {
        // console.log("added to checkout", product)
        const alreadyAdded = cart.find(pd => pd._id === product._id);
        const newCart = [...cart, product];
        alreadyAdded ? alert('This Product has been already added. Go for Checkout') : setCart(newCart)

    }
    console.log(cart)


    return (
        <div className='home-body'>
            <Form inline className='nav-search '>

                <FormControl type="text" placeholder="Search" className="mt-5 w-25" />
                <Button className='mt-5' variant="outline-info">Search</Button>
            </Form>
            <div className='card-container'>
                {
                    products.map(product => <Shop key={product._id} handleAddCheckout={handleAddCheckout} product={product}></Shop>)
                }
            </div>
        </div>
    );
};

export default Home;