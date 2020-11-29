import React, { useEffect } from 'react';
import '../styles/Main.scss';

const Main = (props) => {

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!props.user){
            props.getUserInfo();
        }
    }, [props])

    function leadSignUpPage(e){
        props.history.push('/signup');
    }

    function leadSignInPage(e){
        props.history.push('/signin');
    }

    return (
        <div>
            <div className="main-title">
                <h1>NuTrack</h1>
                <div className="btn-wrapper">
                    <button className="red submitBtn main-btn" onClick={(e) => leadSignUpPage(e)}>Sign Up</button>
                    <button className="red submitBtn main-btn" onClick={(e) => leadSignInPage(e)}>Sign In</button>
                </div>
            </div>
        </div>
    )
}
export default Main;