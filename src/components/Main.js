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
            <div className="main-passage-wrapper">
                <h1 className="main-title">
                    <div className="NU">Nutrition</div>
                    <div className="TRACK">Tracker</div>
                </h1>
                <div className="main-paragraph">Your own <strong>nutrition</strong> coach for <strong>tracking</strong> healthy life.</div>
                <div className="btn-wrapper">
                    <button className="red submitBtn get-started-btn" onClick={(e) => leadIntakePage(e)}>Get Started</button>
                </div>
            </div>
            {/* <div className="arrow-wrapper">
                <i class="arrow down"></i>
            </div>    */}
        </div>
    )
}
export default Main;