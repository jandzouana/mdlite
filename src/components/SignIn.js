import React, {useState, useEffect} from 'react';
import { auth, provider, popup, onAuthStateChange } from '../firebase';

const SignIn = () =>{
    function handleClick(){
        popup(auth, provider).then(data => {
            // setEmail(data.user.email);
            // localStorage.setItem("email", data.user.email);
        })
    }

    // useEffect(()=>{
    //     setValue(localStorage.getItem("email"));
    // }, [])

    return(
        <div>
            <button onClick={handleClick}>Sign in With Google</button>
            <input type={"checkbox"} name={"remember"}/>
            <label htmlFor={"remember"}>Remember me</label>
        </div>
    )
}

export default SignIn;
