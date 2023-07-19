import React, {useState, useEffect, useRef} from 'react';
import { auth, provider, popup, app, persistence } from '../firebase';
import logo from '../assets/logo.png';

const SignIn = (props) =>{
    const [showLoader, setShowLoader] = useState(false);
    const popupShowing = useRef(false);

    function handleClick(){
        popupShowing.current = true;
        setShowLoader(true);
        const remember = document.getElementById("remember");
        console.log("Setting persistence: " + remember.checked);

        popup(auth, provider).then(data => {
            auth.setPersistence(remember ? persistence : null).then(r => {

            });
        }).catch(exception => {
            console.log("Request didn't go through:\n" + exception);
            if(!popupShowing) setShowLoader(false);
            popupShowing.current = false;
        })
    }

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
            <div className={`spin-loader ${showLoader? "spin-show" : ""}`}></div>
        </div>
    )
}

export default SignIn;
