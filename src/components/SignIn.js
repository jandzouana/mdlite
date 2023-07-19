import React, {useState, useEffect} from 'react';
import { auth, provider, popup, app, persistence } from '../firebase';

const SignIn = () =>{
    function handleClick(){
        const remember = document.getElementById("remember");
        console.log("Setting persistence: " + remember.checked);

        auth.setPersistence(remember ? persistence : null).then(r => {

        });

        popup(auth, provider).then(data => {
            // setEmail(data.user.email);
            // localStorage.setItem("email", data.user.email);
        }).catch(exception => {console.log("Request didn't go through:\n" + exception)})
    }

    // useEffect(()=>{
    //     setValue(localStorage.getItem("email"));
    // }, [])

    return(
        <div>
            <button onClick={handleClick}>Sign in With Google</button>
            <input type={"checkbox"} name={"remember"} id={"remember"}/>
            <label htmlFor={"remember"}>Remember me</label>
        </div>
    )
}

export default SignIn;
