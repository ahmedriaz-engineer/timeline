import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Badge, Image, Col, Dropdown, } from 'react-bootstrap';
import Orders from './components/Orders/Orders';
import { createContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckOut from './components/Checkout/Checkout';

export const productContext = createContext()

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(cart)
  useEffect(() => {
    fetch('http://localhost:5000/watches')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])
  const handleLogout = () => {
    setLoggedInUser({});
  }
  return (
    <productContext.Provider value={[products, setProducts, loggedInUser, setLoggedInUser, cart, setCart]}>
      <Router>

        <div className="app-container">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="" sticky="top">
            <Navbar.Brand className='ml-5' href="/"><h1>Timeline</h1>The Empire of Watch</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto  mr-5 p-3">

                <Link className='nav-link mt-2' to="/"><p>Home</p></Link>

                <Link className='nav-link mt-2' to="/checkout">Checkout <Badge variant="info">{cart.length}</Badge><span className="sr-only">unread messages</span></Link>

                <Link className='nav-link mt-2' to="/admin" >Admin</Link>

                {
                  loggedInUser.email ? <Dropdown>
                    <Dropdown.Toggle menuAlign={{ lg: 'left' }} variant="dark" id="dropdown-basic">
                      <img className="profile-image" src={loggedInUser.userImage} alt="" srcset="" />

                    </Dropdown.Toggle>

                    <Dropdown.Menu className='mr-4'>
                      <Dropdown.Item ><FontAwesomeIcon icon={faUserCircle} /> My Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> : <Link className='nav-link mt-2' to="/login">Login</Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/checkout">
              <CheckOut />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </productContext.Provider>

  );
}

export default App;
