import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { productContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useForm } from "react-hook-form";
import './Shipment.css'

const Shipment = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);
    

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = data =>{
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };
        
        fetch('https://timeline-projects-server.herokuapp.com/addOrder', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                alert('Order placed successfully');
                processOrder();
            }
        })
    }

    return (
        <div>
            <h3>Your shipment page!</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className='addInput' placeholder='Enter Name' type='text' defaultValue={loggedInUser.name} {...register("name", { required: true })} />
                {errors.name && <span className='error'>This field is required!</span>}<br />

                <input className='addInput' placeholder='E-mail Address' type='email' defaultValue={loggedInUser.email} {...register("email", { required: true })} />
                {errors.email && <span className='error'>This field is required!</span>}<br />

                <input className='addInput' placeholder='Enter Phone Number' type='tel' {...register("telephone", { required: true })} />

                {errors.telephone && <span className='error'>This field is required!</span>}<br />

                <input className='addInput' placeholder='Enter Shipping Address' type='text' {...register("shippingAddress", { required: true })} />
                 

                {errors.shippingAddress && <span className='error'>This field is required!</span>}<br />

                <Button className='card-button addInput' variant="success" type="submit"  >Submit</Button>
                
            </form>


        </div>
    );
};

export default Shipment;