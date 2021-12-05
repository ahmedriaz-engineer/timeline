import React, { useContext } from 'react';
import './Cart.css';
import { productContext } from './../../App';


const Cart = (props) => {
    const reviewBtn = (props.children);
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);
    // console.log(cart);
    let price = cart.reduce((price, product) => Number(price) + Number(product.price * product.quantity), 0);

    let shipping = 0;
    if (price > 0) {
        shipping = 12.99;
    }
    else if (price > 20000) {
        shipping = 5.99;
    }
    return (
        <div className="cart-container ml-5">
            <h2 className="cart-heading mt-5">Order Summery</h2>
            <div className='cart-item'>
                <p>Items Ordered: {cart.length}</p>
                <p>Product Price: {price}</p>
                <p>Shipping Cost: {shipping}</p>
                <p>Total Price: {price + shipping}</p>
                {
                    reviewBtn
                }
            </div>
        </div>
    );
};

export default Cart;