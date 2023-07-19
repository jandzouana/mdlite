import React, { useState, useEffect, useRef } from 'react';
import {auth, onAuthStateChange} from "../firebase";

const AuthManager = (props) => {
    const [user, setUser] = useState();
    const {handleUserSignIn, handleSignOut, handleFetchUser} = props;

    const fetchedUser = useRef(false);
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
                if(fetchedUser.current) {
                    console.log("User logged out");
                    setUser(null);

                    handleSignOut();
                }
            }
            if(!fetchedUser.current){
                //console.log("Fetched user");
                handleFetchUser();
                fetchedUser.current = true;
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
