import React, { useContext, useState, useEffect } from 'react';
import { productContext } from '../../App';
import './Orders.css';

const Orders = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser, cart, setCart] = useContext(productContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://timeline-projects-server.herokuapp.com/orders?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-Type' : 'application/json',
                'authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])
    console.log(orders)
    return (
        <div>
            <h1>Hello {loggedInUser.name}!</h1>
            <h3>You have {orders.length} Orders</h3>
            {
                orders.map(order => {
                    const {_id, name, orderTime, shipment, products} = order;
                    
                    return (
                        <div className='orderContainer' key={_id}>
                            <p>Order ID: {_id}</p>
                            <p>Order Date: {new Date(orderTime).toString('dd/MM/yyyy HH/mm/ss')}</p>
                            <p>Order by: {name}</p>
                            <p>Order to: {shipment.name}</p>
                            
                        </div>
                    )
                })
            }
            
        </div>
    );
};

export default Orders;