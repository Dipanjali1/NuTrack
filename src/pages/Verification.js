import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loading from "../components/Loading.js";
import API from "../services/Api.js";
import "../style/Auth.scss";

const Verification = (props) => {
    const {
        user,
        history,
        loading,
        updateClicked,
        deleteClicked,
        setLoading,
        setVerified,
        setUpdateClicked,
        setDeleteClicked,
    } = props;

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    useEffect(() => {
        const checkBox = document.querySelector(".checkBox");
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!updateClicked && !deleteClicked){
            history.push("/");
        }
      }, [props])

    function handleVerify(e){
        e.preventDefault();
        setLoading(true);
        API.handleSignIn(username, password)
        .catch(err => err)
        .then(data => {
            if(data.error){
                setError(data.error);
                setLoading(false);
            } else {
                if(data.user.username === user.user.username){
                    setUsername("");
                    setPassword("");
                    setVerified(true);
                    setLoading(false);
                    history.push("/account");
                } else {
                    setLoading(false);
                    setError("Invalid Username or Password");
                }
            }
        })
    }

    function handleGoBack(){
        setUpdateClicked(false);
        setDeleteClicked(false);
        history.push("/account");
    }

    return (
        <div>
            {loading ?
            <Loading />
            :
            <div className="sign-in-wrapper">
                <div className="errorMessage-auth">{error}</div>
                <form className="addItemForm" onSubmit={handleVerify}>
                    <div className="segment divInForm">
                        <h1 className="verify-title">Please, Verify It&apos;s you</h1>
                    </div>
                    <label className="inputLabel">
                        <input className="userInput" type="text" name="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label className="inputLabel">
                        <input className="userInput" type="password" name="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button className="red submitBtn" type="submit">Verify</button>
                </form>
                <div className="updateProToggleBtn" onClick={(e) => handleGoBack(e)}>
                    Go Back to Account
                </div>
            </div>}
        </div>
    )
}
Verification.propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    updateClicked: PropTypes.bool.isRequired,
    deleteClicked: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setVerified: PropTypes.func.isRequired,
    setUpdateClicked: PropTypes.func.isRequired,
    setDeleteClicked: PropTypes.func.isRequired
};
export default Verification;