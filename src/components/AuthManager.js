import React, { useState, useEffect } from 'react';
import {auth, onAuthStateChange} from "../firebase";

const AuthManager = (props) => {
    const [user, setUser] = useState();
    const {handleUserSignIn, handleSignOut} = props;
    // User sign in state
    useEffect(() => {
        const unsubscribe = onAuthStateChange(auth, (user) => {
            if (user) {
                console.log("User logged in: ", user);
                // User is signed in
                // Perform necessary actions for signed-in user
                setUser(user);

                handleUserSignIn();
            } else {
                console.log("User logged out");
                setUser(null);

                handleSignOut();
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return(
        <></>
        )
}

export default AuthManager;
