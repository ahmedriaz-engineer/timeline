import { React, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { productContext } from '../../App';
import './Checkout.css';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Review from '../Review/Review';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';




const Checkout = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);
    

    // let today = new Date();
    // const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
    // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    // const dateTime = date + ' - ' + time;

    

    useEffect(() => {
        fetch('https://timeline-projects-server.herokuapp.com/watches')
            .then(response => response.json())
            .then(data => {
                cartFunction(data);

            })

    }, []);

    const cartFunction = (products) => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = products.find(product => product._id === key);
            product.quantity = savedCart[key];

            return product;
        })
        setCart(cartProducts);
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(product => product._id !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    return (
        <div className='checkout-body '>
            <div className='card-cart-container'>
                <div className='c-container'>
                    {
                        cart.map(product => <Review key={product._id} removeProduct={removeProduct} product={product}></Review>)
                    }

                </div>
                <div >
                    <Cart>
                        <Link to='/shipment'>
                            <Button className='card-button' variant="success"  >Process Order</Button>

                        </Link>
                    </Cart>
                </div>
            </div>

        </div>

    );
};

export default Checkout;