import React, { useContext, useState } from 'react';
import './Admin.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { productContext } from '../../App';
import { Button, Col, Dropdown, Nav, Row, Tab, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisH, faPlus, faTh, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { fab, faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)





const Admin = () => {
    const [products, setProducts] = useContext(productContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
        // console.log(data)
        const watchData = {
            name: data.watchName,
            price: data.price,
            imageURL: imageURL
        }
        console.log(watchData);
        const url = 'http://localhost:5000/addWatch';
        fetch(url, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(watchData)

        })
            .then(response => console.log('server side response: ', response))

    };

    const handleUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '9afaf36d42c8bc97c33b08f5080d0d42')
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const editHandler = () => {
        console.log("edit clicked")
    }
    const deleteHandler = () => {
        console.log("delete clicked")
    }
    return (

        <div className=' admin-container mt-5' >
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row >
                    <Col sm={3} >
                        <Nav variant="pills" className=" bg-dark flex-column">
                            <div className='admin-nav'>
                                <Nav.Item >
                                    <Nav.Link eventKey="first"><FontAwesomeIcon icon={faMicrosoft} /> <b>Manage Watch</b></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second"><FontAwesomeIcon icon={faPlus} /> <b> Add Watch</b></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third"><FontAwesomeIcon icon={faEdit} /> <b>Edit Watch</b></Nav.Link>
                                </Nav.Item>

                            </div>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className='App'>
                            <Tab.Pane eventKey="first">
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Watch Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            products.map(product => {

                                                return (
                                                    <>
                                                        <tr key={product._id}>
                                                            <td>1</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                                        <FontAwesomeIcon icon={faEllipsisH} />
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={editHandler}><FontAwesomeIcon icon={faEdit} /> Edit</Dropdown.Item>
                                                                        <Dropdown.Item onClick={deleteHandler}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>
                                                        </tr>
                                                        
                                                            <td>1</td>
                                                            <td><input type= 'text' defaultValue={product.name}/></td>
                                                            <td><input type= 'text' defaultValue={product.price}/></td>
                                                        
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <input onChange={handleUpload} id='files' type='file' /><br />
                                    <input className='addInput' placeholder='Enter Name' {...register("watchName", { required: true })} />
                                    <input className='addInput' placeholder='Enter Price' {...register("price", { required: true })} /> <br />
                                    {errors.exampleRequired && <span>This field is required</span>}

                                    <br />
                                    <Button type="submit" className='card-button' variant="info">Buy Now</Button>
                                </form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <p>lorem500</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>

    );
};

export default Admin;