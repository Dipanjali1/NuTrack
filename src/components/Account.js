import React, { useState, useEffect } from 'react';
import '../styles/Account.scss';

const USERS = 'http://localhost:3001/api/v1/';

const Account = (props) => {

    const [ bmrInput, setBMRInput ] = useState(0);
    const [ newPasswordInput, setNewPasswordInput ] = useState('');
    const [ newNameInput, setNewNameInput ] = useState('');
    const [ newEmailInput, setNewEmailInput ] = useState('');

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!props.user){
            props.getUserInfo();
        }
    }, [props])

    async function handleUpdateBMR(e){
        e.preventDefault();
        if(window.confirm('Are you sure you want to update BMR?')){
            if(bmrInput > 0){
                const reqObj ={
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    },
                    body: JSON.stringify({user:{
                    bmr: parseFloat(bmrInput),
                }})
                }
                await fetch(`${USERS}update-profile`, reqObj)
                .then(resp => resp.json())
                .then(data => {
                    if(data.error) console.log(data.error);
                    setBMRInput(0);
                    props.getUserInfo();
                });
            }
        } else {
            return null;
        }
    }

    async function handleUpdateProfile(e){
        e.preventDefault();
        if(window.confirm('Are you sure you want to update profile?')){
            if(newPasswordInput.length < 6 || newNameInput === '' || newEmailInput === ''){
                const reqObj = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    },
                    body: JSON.stringify({user:{
                    password: newPasswordInput,
                    name: newNameInput,
                    email: newEmailInput
                }})
                }
                await fetch(`${USERS}update-profile`, reqObj)
                .then(resp => resp.json())
                .then(data => {
                    if(data.error) console.log(data.error);
                    setNewPasswordInput('');
                    setNewNameInput('');
                    setNewEmailInput('');
                    props.setVerified(false);
                    props.getUserInfo();
                });
            }
        } else {
            return null;
        }
    }

    async function handleAccountDelete(e, user){
        e.preventDefault();
        let reqObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            },
            body: JSON.stringify({user:{username: user.username}})
        }
        await fetch(`${USERS}delete-account`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            if(!data.error){
                localStorage.removeItem('user');
                alert(data.message)
                props.history.push('/');
            }
        })
    }

    function leadToBMRpage(){
        props.history.push('/BMRestimate');
    }

    return (
        <div className="account-wrapper">
            {
            props.user ?
            <div>
                <div><strong>Username:</strong> {props.user.user.username}</div>
                <div><strong>Name:</strong> {props.user.user.name}</div>
                <div><strong>Email:</strong> {props.user.user.email}</div>
                <div><strong>BMR:</strong> {props.user.user.bmr}</div>
            </div>
            :
            null
            }
            <div>
                <form className="addItemForm" onSubmit={(e) => handleUpdateBMR(e)}>
                    <label className="inputLabel">
                        <input className="userInput" type="text" placeholder="BMR" value={bmrInput} onChange={(e) => setBMRInput(e.target.value)} />
                    </label>
                    <button className="red submitBtn" type="submit">
                        Update BMR
                    </button>
                    <div className="manualFromOpenBtn" onClick={(e) => leadToBMRpage(e)}>
                        Want to know your BMR estimate?
                    </div>
                </form>
            </div>
            <div>
                {props.verified && props.updateClicked ?
                <form className="addItemForm" onSubmit={(e) => handleUpdateProfile(e)}>
                    <div className="updateProToggleBtn" onClick={(e) => props.handleVerification(e)}>
                        Want to close the form?
                    </div>
                    <label className="inputLabel">
                        <input className="userInput" type="password" placeholder="new password" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} />
                    </label>
                    <label className="inputLabel">
                        <input className="userInput" type="text" placeholder="new name" value={newNameInput} onChange={(e) => setNewNameInput(e.target.value)} />
                    </label>
                    <label className="inputLabel">
                        <input className="userInput" type="text" placeholder="new email" value={newEmailInput} onChange={(e) => setNewEmailInput(e.target.value)} />
                    </label>
                    <button className="red submitBtn" type="submit">
                        Update Profile
                    </button>
                </form>
                :
                <div className="update updateProToggleBtn" onClick={(e) => props.handleVerification(props.history, e)}>
                    Want to update Profile info?
                </div>}
            </div>
            <div>
                {props.verified && props.deleteClicked ?
                <button onClick={(e) => handleAccountDelete(e, props.user.user)}>DELETE YOUR ACCOUNT</button>
                :
                <div className="delete delete-account" onClick={(e) => props.handleVerification(props.history, e)}>Delete Account</div>}
            </div>
        </div>
    )
}
export default Account;