import React, { useEffect, useState } from "react";
import API from '../services/Api.js';
import '../styles/Auth.scss';

const SignIn = (props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(localStorage.getItem('user')){
            props.history.push('/')
        }
      }, [props])

    function handleSignIn(e){
        e.preventDefault();
        props.setLoading(true);
        API.handleSignIn(username, password)
        .catch(err => console.log(err))
        .then(data => {
            if(data.error){
                setError(data.error);
                props.setLoading(false);
            } else {
                props.handleSignIn(data);
                setUsername('');
                setPassword('');
                props.getUserInfo();
                props.setVerified(false);
                props.setUpdateClicked(false);
                props.setDeleteClicked(false);
                props.setLoading(false);
                props.history.push('/')
            }
        })
    }

    function leadSignUpPage(e){
        props.history.push('/signup');
    }

    return (
        <div>
            {props.loading ?
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            :
            <div className="sign-in-wrapper">
                <div className="errorMessage-auth">{error}</div>
                <form className="addItemForm" onSubmit={handleSignIn}>
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
                    <div className="manualFormOpenBtn" onClick={(e) => leadSignUpPage(e)}>Don't have an account yet?</div>
                </form>
            </div>}
        </div>
    )
}
export default SignIn;