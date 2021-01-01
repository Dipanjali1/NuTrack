import React, { useState, useEffect } from 'react';
import '../styles/Account.scss';
import API from '../services/Api.js';
import CalorieBurnSuggestion from './CalorieBurnSuggestion';

const Account = (props) => {
    const [ bmrInput, setBMRInput ] = useState(0);
    const [ newPasswordInput, setNewPasswordInput ] = useState('');
    const [ newPasswordConfirmationInput, setNewPasswordConfirmationInput ] = useState('');
    const [ newNameInput, setNewNameInput ] = useState('');
    const [ newEmailInput, setNewEmailInput ] = useState('');
    const [ updateBMRclicked, setUpdateBMRclicked ] = useState(false);
    const [ currDateCalorieSum, setCurrDateCalorieSum ] = useState(0);

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
                props.setLoading(true);
                API.updateBMR(localStorage.getItem('user'), bmrInput)
                .catch(err => console.log(err))
                .then(data => {
                    if(data.error) console.log(data.error);
                    setBMRInput(0);
                    props.getUserInfo();
                    props.setLoading(false);
                });
            }
        } else {
            return null;
        }
    }

    function handleUpdateProfile(e){
        e.preventDefault();
        if(window.confirm('Are you sure you want to update profile?')){
            if(newPasswordConfirmationInput !== newPasswordInput) return alert('Password and confirm password does not match');
            if(newPasswordInput.length >= 6 || newNameInput === '' || newEmailInput === ''){
                props.setLoading(true);
                API.updateProfile(localStorage.getItem('user'), newPasswordInput, newNameInput, newEmailInput)
                .catch(err => console.log(err))
                .then(data => {
                    if(data.error) console.log(data.error);
                    setNewPasswordInput('');
                    setNewPasswordConfirmationInput('');
                    setNewNameInput('');
                    setNewEmailInput('');
                    props.setVerified(false);
                    props.getUserInfo();
                    props.setLoading(false);
                });
            } else {
                console.log('Update Fail');
                return alert('Any input cannot be blank and Password has to be longer than 6');
            }
        } else {
            return null;
        }
    }

    function handleAccountDelete(e, user){
        e.preventDefault();
        if(window.confirm('Are you sure you want to delete account?')){
            props.setLoading(true);
            API.deleteAccount(localStorage.getItem('user'), user.username)
            .catch(err => console.log(err))
            .then(data => {
                if(!data.error){
                    localStorage.removeItem('user');
                    props.setLoading(false);
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

    function renderNuReports(){
        API.getReports(localStorage.getItem('user'))
        .catch(err => console.log(err))
        .then(data => {
            handleTotalCalIntake(data);
        });
    }

    function handleTotalCalIntake(data){
        if(localStorage.getItem('user')){
            let sum = 0;
            data.forEach(data => {
                let currMonth = new Date().getMonth() + 1;
                let currYear = new Date().getFullYear();
                let currDate = new Date().getDate();
                let reportMonth = parseInt(data.intakeDate.split('-')[1]);
                let reportYear = parseInt(data.intakeDate.split('-')[0]);
                let reportDate = parseInt(data.intakeDate.split('-')[2]);
                if(currYear === reportYear && currMonth === reportMonth && currDate === reportDate){
                    data.intakes.forEach(data => {
                        sum += data.calories;
                    });
                }
            })
            setCurrDateCalorieSum(sum);
        }
    }

    function handleRemainingCalorie(bmr){
        if(!bmr) return "Please Update your BMR";
        let result = bmr - (currDateCalorieSum);
        return <CalorieBurnSuggestion result={result} currDateCalorieSum={currDateCalorieSum} />
    }

    return (
        <div className="account-wrapper">
            {renderNuReports()}
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
            {props.loading ?
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            :
            <div className="account-info">
                {props.user ?
                <div>
                    <h1>Profile</h1>
                    <div className="line"></div>
                    <div><strong>Username:</strong> {props.user.user.username}</div>
                    <div><strong>Name:</strong> {props.user.user.name}</div>
                    <div><strong>Email:</strong> {props.user.user.email}</div>
                    <div><strong>BMR:</strong> {props.user.user.bmr}</div>
                    <div className="calorie-guide-wrapper">
                        {handleRemainingCalorie(props.user.user.bmr)}
                    </div>
                </div>
                :
                null}
                <div className="account-bmr-form-wrapper">
                    {updateBMRclicked ?
                    <form className="addItemForm update-bmr-form" onSubmit={(e) => handleUpdateBMR(e)}>
                        <h2>Update BMR</h2>
                        <div className="line"></div>
                        <label className="inputLabel">
                            <input className="userInput" type="text" placeholder="BMR" value={bmrInput} onChange={(e) => setBMRInput(e.target.value)} />
                        </label>
                        <button className="red submitBtn" type="submit">
                            Update BMR
                        </button>
                        <div className="manualFormOpenBtn lead-bmr-estimate-btn" onClick={(e) => leadToBMRpage(e)}>
                            Want to know your BMR estimate?
                        </div>
                    </form>
                    :
                    null
                    }
                </div>
                <div className="update-profile-form">
                    {props.verified && props.updateClicked ?
                    <form className="addItemForm" onSubmit={(e) => handleUpdateProfile(e)}>
                        <h1>Update Profile</h1>
                        <div className="line"></div>
                        <label className="inputLabel">
                            <input className="userInput" type="password" placeholder="New Password" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} />
                        </label>
                        <label className="inputLabel">
                            <input className="userInput" type="password" placeholder="Confirm Password" value={newPasswordConfirmationInput} onChange={(e) => setNewPasswordConfirmationInput(e.target.value)} />
                        </label>
                        <label className="inputLabel">
                            <input className="userInput" type="text" placeholder="New Name" value={newNameInput} onChange={(e) => setNewNameInput(e.target.value)} />
                        </label>
                        <label className="inputLabel">
                            <input className="userInput" type="text" placeholder="New Email" value={newEmailInput} onChange={(e) => setNewEmailInput(e.target.value)} />
                        </label>
                        <button className="red submitBtn" type="submit">
                            Update Profile
                        </button>
                        <div className="updateProToggleBtn" onClick={(e) => props.handleVerification(e)}>
                            Click here to Close the form
                        </div>
                    </form>
                    :
                    null}
                </div>
                <div className="delete-column-container">
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
            </div>}
        </div>
    )
}
export default Account;