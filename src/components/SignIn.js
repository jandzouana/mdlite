import React, {useState, useEffect, useRef} from 'react';
import { auth, provider, popup, app, persistence } from '../firebase';
import logo from '../assets/logo.png';
import glogo from '../assets/glogo.png';

const SignIn = (props) =>{
    const [showLoader, setShowLoader] = useState(false);
    const popupClickCount = useRef(0);

    function handleClick(){
        popupClickCount.current = popupClickCount.current + 1;
        setShowLoader(true);
        const remember = document.getElementById("remember");
        console.log("Setting persistence: " + remember.checked);
        popup(auth, provider).then(data => {
            console.log("data", data);

            auth.setPersistence(remember ? persistence : null).then(r => {

            });
        }).catch(exception => {
            console.log("Request didn't go through:\n" + exception);
            setTimeout(()=>{
                if(popupClickCount.current <= 1) {
                    setShowLoader(false);
                }
                else popupClickCount.current = 0;
            }, 500)
        })
    }

    return(
        <div id={"sign-in-container"}>
            <img id="sign-in-logo" src={logo} alt="logo" />
            <section>
                <button id={"sign-in"} className={"button purple-button"} onClick={handleClick}>Sign in With Google<img src={glogo} alt={"glogo"}/></button>
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
