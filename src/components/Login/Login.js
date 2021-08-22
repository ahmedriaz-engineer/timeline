import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { productContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
library.add(fab)



if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const [products, setProducts, loggedInUser, setLoggedInUser] = useContext(productContext);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    

        const handleGoogleSignIn = () => {
            firebase.auth()
                .signInWithPopup(googleProvider)
                .then((result) => {
                    const user = result.user;
                    const { displayName, email, photoURL } = user;
                    const signedInUser = { name: displayName, email, userImage: photoURL }
                    setLoggedInUser(signedInUser);
                    history.replace(from);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
        const handleFacebookSignIn = () => {
            firebase.auth()
                .signInWithPopup(facebookProvider)
                .then((result) => {
                    const user = result.user;
                    const { displayName, email, photoURL } = user;
                    const signedInUser = { name: displayName, email, userImage: photoURL }
                    setLoggedInUser(signedInUser);
                    // history.replace(from);

                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
        return (
            <div className='login-container App'>
                <Button onClick={handleGoogleSignIn} className='card-button sign-in w-25' variant="info"><FontAwesomeIcon className="mr-5" icon={['fab', 'google']} /> Sign in with Google</Button>
                <br /><br />
                <Button onClick={handleFacebookSignIn} className='card-button sign-in w-25' variant="info"><FontAwesomeIcon className="mr-5" icon={['fab', 'facebook']} /> Sign in with Facebook</Button>
                <h3>Signed in user: {loggedInUser.name}</h3>


            </div>
        );
    };

    export default Login;