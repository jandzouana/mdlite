import React, {useState, useEffect} from 'react';
import { logOut, auth } from '../firebase';

const SignOut = (props) =>{
    const [email, setEmail] = useState("");

    function handleClick(){
        logOut(auth).then(() => {
            console.log("User logged out");
        });
    }

    // useEffect(()=>{
    //     setValue(localStorage.getItem("email"));
    // }, [])

    return(
        <button onClick={handleClick} id={"sign-out"}>Sign Out</button>
    )
}

export default SignOut;
