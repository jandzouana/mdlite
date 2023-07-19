import React, {useState, useEffect} from 'react';
import { logOut, auth } from '../firebase';

const SignOut = (props) =>{
    const [email, setEmail] = useState("");

    function handleClick(){
        logOut(auth).then(() => {
            //console.log("User logged out");
        });
    }

    return(
        <button onClick={handleClick} id={"sign-out"} className={"purple-button"}>Sign Out</button>
    )
}

export default SignOut;
