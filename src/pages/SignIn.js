import React, { useEffect, useState } from "react";
import API from "../services/Api.js";
import PropTypes from "prop-types";
import Loading from "../components/Loading.js";
import "../style/Auth.scss";

const SignIn = (props) => {
    const {
        loading,
        history,
        setLoading,
        handleSignIn,
        getUserInfo,
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
        if(localStorage.getItem("user")){
            history.push("/")
        }
      }, [props])

    function signin(e){
        e.preventDefault();
        setLoading(true);
        API.handleSignIn(username, password)
        .catch(err => err)
        .then(data => {
            if(data.error){
                setError(data.error);
                setLoading(false);
            } else {
                handleSignIn(data);
                setUsername("");
                setPassword("");
                getUserInfo();
                setVerified(false);
                setUpdateClicked(false);
                setDeleteClicked(false);
                setLoading(false);
                history.push("/")
            }
        })
    }

    function leadSignUpPage(){
        history.push("/signup");
    }

    return (
        <div>
            {loading ?
            <Loading />
            :
            <div className="sign-in-wrapper">
                <div className="errorMessage-auth">{error}</div>
                <form className="addItemForm" onSubmit={signin}>
                    <div className="segment divInForm">
                        <h1 className="auth-title">Sign In</h1>
                    </div>
                    <label className="inputLabel">
                        <input className="userInput" type="text" name="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label className="inputLabel">
                        <input className="userInput" type="password" name="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button className="red submitBtn" type="submit">Sign In</button>
                    <div className="manualFormOpenBtn" onClick={(e) => leadSignUpPage(e)}>Don&apos;t have an account yet?</div>
                </form>
            </div>}
        </div>
    )
}
SignIn.propTypes = {
    loading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    setLoading: PropTypes.func.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    setVerified: PropTypes.func.isRequired,
    setUpdateClicked: PropTypes.func.isRequired,
    setDeleteClicked: PropTypes.func.isRequired
};
export default SignIn;