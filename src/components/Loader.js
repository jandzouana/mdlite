import React, { useEffect } from 'react';
import logo from '../assets/logo.png';

const Loader = (props) => {
    const {show} = props;
    const delay = 0;

    useEffect(() => {
        const timer = setTimeout(() => {
            showLogo(true);
        }, delay); // Delay to trigger the fade-in effect

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        showLogo(show);

    }, [show]);

    function showLogo(show){
        let logo = document.getElementById("loading-logo");
        let screen = document.getElementById("loading-screen");
        if(show) {
            logo.style.opacity = "1.0";
            screen.style.opacity = "1.0";
            screen.style.visibility = "visible";
        }
        else {
            logo.style.opacity = "0";
            screen.style.opacity = "0";
            setTimeout(()=>{screen.style.visibility = "hidden";}, 300)

        }
    }

    return (
        <div id={"loading-screen"}>
            <img id="loading-logo" src={logo} alt="Fading Image" />
        </div>
        );
    };

export default Loader;
