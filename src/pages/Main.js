import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../components/Loading.js";
import "../style/Main.scss";

const Main = (props) => {
    const {
        user,
        loading,
        history,
        getUserInfo,
    } = props;

    useEffect(() => {
        const checkBox = document.querySelector(".checkBox");
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!user){
            getUserInfo();
        }
    }, [props])

    function leadIntakePage(){
        history.push("/intakeestimate");
    }

    return (
        <div className="main-wrapper">
            {loading ?
            <Loading />
            :
            <div className="main-passage-wrapper">
                <h1 className="main-title">
                    <div className="NU">Nutrition</div>
                    <div className="TRACK">Tracker</div>
                </h1>
                <div className="main-paragraph">Your own <strong>nutrition</strong> coach for <strong>tracking</strong> healthy life.</div>
                <div className="btn-wrapper">
                    <button className="red submitBtn get-started-btn" onClick={(e) => leadIntakePage(e)}>Get Started</button>
                </div>
            </div>}
        </div>
    )
}
Main.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
};
export default Main;