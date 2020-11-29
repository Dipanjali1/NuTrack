import React, { useEffect, useState } from "react";
import '../styles/Auth.scss';
// import { Link } from 'react-router-dom';

const LOGIN = 'http://localhost:3001/api/v1/login';

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
      }, [props]) // Component Did Mount

    async function handleSignIn(e){
        e.preventDefault();
        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user:{
                username: username,
                password: password
            }})
        }
        await fetch(LOGIN, reqObj)
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                setError(data.error);
            } else {
                props.handleSignIn(data);
                setUsername('');
                setPassword('');
                props.history.push('/')
            }
        })
    }

    function leadSignUpPage(e){
        props.history.push('/signup');
    }

    return (
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
                <div className="manualFromOpenBtn" onClick={(e) => leadSignUpPage(e)}>Don't have an account yet?</div>
            </form>
        </div>
    )
}
export default SignIn;