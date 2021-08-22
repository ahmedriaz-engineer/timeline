import React from 'react';
import { Button, Table, Image, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { productContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './Checkout.css'


const Checkout = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);
    const history = useHistory();
    const handleProceed = () => {
        console.log('clicked');
        history.push('/orders')
    }
    console.log(cart)
        
    
   

    return (
        <div className=''>
            <h1> This is Checkout</h1>
            <Button variant='info' onClick={handleProceed} >Proceed Order</Button>
            <div className='c-container'>
                {
                    cart.map(checkout => {
                        const { name, price, imageURL } = checkout;
                        return (
                            <div key={name} className='w-75 bg-info checkout'>
                                <img src={imageURL} alt='images' width='150'></img>
                                <h5>{name}</h5>
                                <h5 id='netPrice'>{price}</h5>
                                <div className='quantity'>
                                    <FontAwesomeIcon onClick='' id='quantityMinus' icon={faMinus} />
                                    <input defaultValue='1' type='number' className="form-control App" id="quantity-input" />
                                    <FontAwesomeIcon id='quantityPlus' icon={faPlus} />
                                </div>
                                {
                                    parseFloat(document.getElementById('quantity-input').value)*parseFloat(document.getElementById('netPrice').innerText)
                                }


                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Checkout;