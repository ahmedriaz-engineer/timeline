import React, { useContext } from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { productContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [products, setProducts, loggedInUser, setLoggedInUser] = useContext(productContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;