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

    function leadIntakePage(e){
        props.history.push('/intakeestimate');
    }

    return (
        <div className="main-wrapper">
            <h1 className="main-title">NUTRACK</h1>
            <div className="main-paragraph">Your own nutrition coach for tracking healthy life.</div>
            <div className="btn-wrapper">
                <button className="red submitBtn get-started-btn" onClick={(e) => leadIntakePage(e)}>Get Started</button>
            </div>
        </div>
    )
}
export default Main;