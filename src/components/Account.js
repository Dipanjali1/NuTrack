import React, { useState, useEffect } from 'react';
import '../styles/Account.scss';
import API from '../services/Api.js';

const Account = (props) => {

    const [ bmrInput, setBMRInput ] = useState(0);
    const [ newPasswordInput, setNewPasswordInput ] = useState('');
    const [ newNameInput, setNewNameInput ] = useState('');
    const [ newEmailInput, setNewEmailInput ] = useState('');
    const [ updateBMRclicked, setUpdateBMRclicked ] = useState(false);

    useEffect(() => {
        const checkBox = document.querySelector('.checkBox');
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!props.user){
            props.getUserInfo();
        }
    }, [props])

    function handleUpdateBMR(e){
        e.preventDefault();
        if(window.confirm('Are you sure you want to update BMR?')){
            if(bmrInput > 0){
                API.updateBMR(localStorage.getItem('user'), bmrInput)
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

    function handleUpdateProfile(e){
        e.preventDefault();
        if(window.confirm('Are you sure you want to update profile?')){
            if(newPasswordInput.length < 6 || newNameInput === '' || newEmailInput === ''){
                API.updateProfile(localStorage.getItem('user'), newPasswordInput, newNameInput, newEmailInput)
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

    function handleAccountDelete(e, user){
        e.preventDefault();
        if(window.confirm('Are you sure you want to delete account?')){
            API.deleteAccount(localStorage.getItem('user'), user.username)
            .then(data => {
                if(!data.error){
                    localStorage.removeItem('user');
                    alert(data.message)
                    props.history.push('/');
                }
            })
        }
    }

    function leadToBMRpage(){
        props.history.push('/BMRestimate');
    }

    function handleUpdateBMRbtn(e){
        e.preventDefault();
        props.setVerified(false);
        if(!updateBMRclicked){
            setUpdateBMRclicked(true);
        }
    }

    return (
        <div className="account-wrapper">
            <div className="account-menu">
                <div className="update updateProToggleBtn" onClick={(e) => props.handleVerification(props.history, e)}>
                    Update Profile
                </div>
                <div className="update-bmr" onClick={(e) => handleUpdateBMRbtn(e)}>
                    Update BMR
                </div>
                <div className="delete delete-account" onClick={(e) => props.handleVerification(props.history, e)}>
                    Delete Account
                </div>
            </div>
            <div className="account-info">
                {props.user ?
                <div>
                    <h1>Profile</h1>
                    <div className="line"></div>
                    <div><strong>Username:</strong> {props.user.user.username}</div>
                    <div><strong>Name:</strong> {props.user.user.name}</div>
                    <div><strong>Email:</strong> {props.user.user.email}</div>
                    <div><strong>BMR:</strong> {props.user.user.bmr}</div>
                </div>
                :
                null}
                <div>
                    {updateBMRclicked ?
                    <form className="addItemForm update-bmr-form" onSubmit={(e) => handleUpdateBMR(e)}>
                        <label className="inputLabel">
                            <input className="userInput" type="text" placeholder="BMR" value={bmrInput} onChange={(e) => setBMRInput(e.target.value)} />
                        </label>
                        <button className="red submitBtn" type="submit">
                            Update BMR
                        </button>
                        <div className="manualFromOpenBtn lead-bmr-estimate-btn" onClick={(e) => leadToBMRpage(e)}>
                            Want to know your BMR estimate?
                        </div>
                    </form>
                    :
                    null
                    }
                </div>
                <div>
                    {props.verified && props.updateClicked ?
                    <form className="addItemForm" onSubmit={(e) => handleUpdateProfile(e)}>
                        <div className="updateProToggleBtn" onClick={(e) => props.handleVerification(e)}>
                            Click here to Close the form
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
                    null}
                </div>
                <div>
                    {props.verified && props.deleteClicked ?
                    <div className="delete-form-wrapper">
                        <div className="delete-inner-wrapper">
                            <h2>Delete Account</h2>
                            <div className="line"></div>
                            <div>
                                Once you delete your account, there is no going back. Please be certain
                            </div>
                            <button className="delete-account-btn" onClick={(e) => handleAccountDelete(e, props.user.user)}>
                                DELETE YOUR ACCOUNT
                            </button>
                        </div>
                    </div>
                    :
                    null}
                </div>
            </div>
        </div>
    )
}
export default Account;