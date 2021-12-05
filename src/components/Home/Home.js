import React, { useEffect } from 'react';
import Shop from '../Shop/Shop'
import './Home.css'
import { Form, FormControl, Button, } from 'react-bootstrap';
import { useContext } from 'react';
import { productContext } from '../../App';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';


const Home = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);

    useEffect(() => {
        fetch('https://timeline-projects-server.herokuapp.com/watches')
            .then(response => response.json())
            .then(data => {
                cartFunction(data);
            })

    }, []);

    const cartFunction = (data) => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = data.find(product => product._id === key);
            product.quantity = savedCart[key];

            return product;
        })
        setCart(cartProducts);
    }

    const handleAddToCart = (product) => {
        // console.log("added to checkout", product)
        const sameProduct = cart.find(pd => pd._id === product._id);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd._id !== product._id);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];

        }
        // sameProduct ? alert('This Product has been already added.') : 
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd._id === product._id)
        addToDatabaseCart(product._id, count);

    }
    // console.log(cart)




    return (

        <div className='home-body'>
            <Form inline className='nav-search '>

                <FormControl type="text" placeholder="Search" className="mt-5 w-25" />
                <Button className='mt-5' variant="outline-info">Search</Button>
            </Form>
            <div className='checkout-body'>
                <div className='card-cart-container'>
                    <div className='c-container'>
                        {
                            products.map(product => <Shop key={product._id} handleAddToCart={handleAddToCart} product={product}></Shop>)
                        }
                    </div>
                    <div >
                        <Cart>
                            <Link to='/checkout' >
                                <Button className='card-button' variant="info" >Review Order</Button>
                            </Link>
                        </Cart>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default Home;