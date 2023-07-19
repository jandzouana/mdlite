import React, {useState, useEffect} from 'react';
import { auth, provider, popup, app, persistence } from '../firebase';
import logo from '../assets/logo.png';

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
        <div id={"sign-in-container"}>
            <img id="sign-in-logo" src={logo} alt="logo" />
            <section>
                <button id={"sign-in"} onClick={handleClick}>Sign in With Google</button>
                <section>
                    <input type={"checkbox"} name={"remember"} id={"remember"}/>
                    <label htmlFor={"remember"}>Remember me</label>
                </section>
            </section>
        </div>
    )
}

export default SignIn;
