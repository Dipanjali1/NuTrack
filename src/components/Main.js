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

    return (
        <div>
            <div className="main-title">
                {/* <h1>NuTrack</h1> */}
            </div>
        </div>
    )
}
export default Main;