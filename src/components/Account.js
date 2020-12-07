import React, { useState, useEffect } from 'react';
import '../styles/Account.scss';
import API from '../services/Api.js';

const Account = (props) => {

    const [ bmrInput, setBMRInput ] = useState(0);
    const [ newPasswordInput, setNewPasswordInput ] = useState('');
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

    function renderNuReports(){
        API.getReports(localStorage.getItem('user'))
        .then(data => {
            handleTotalCalIntake(data);
        });
    }

    function handleTotalCalIntake(data){
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

    function handleRemainingCalorie(bmr){
        if(!bmr) return "Please Update your BMR";
        let result = bmr - (currDateCalorieSum);
        if(result < 0) {
            return (
                <div className="exceeded-burn-cal-suggestion-wrapper">
                    <div>Today's Total Intake: <span className="not-exceeded-cal">{currDateCalorieSum}</span> Kcal</div>
                    <div>You've exceeded <span className="exceeded-cal">{Math.abs(result)}</span> Kcal</div>
                    <div className="account-calorie-burn-wrapper">
                        <div className="inner-calorie-burn-wrapper">
                        <div className="account-exercise-title">To Burn this:</div>
                        <div>
                            <div className="exercise-name">Walking </div><span className="account-calpermin">{(Math.abs(result) / 7.6).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Running </div> <span className="account-calpermin">{(Math.abs(result) / 13.2).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Push Ups </div> <span className="account-calpermin">{(Math.abs(result) / 7).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Sit Ups </div> <span className="account-calpermin">{(Math.abs(result) / 9).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Plank </div> <span className="account-calpermin">{(Math.abs(result) / 5).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Bicycle Crunch </div> <span className="account-calpermin">{(Math.abs(result) / 3).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Burpees </div><span className="account-calpermin">{(Math.abs(result) / 9.4).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Squat </div><span className="account-calpermin">{(Math.abs(result) / 8).toFixed(1)}</span> min<br/>
                            <div className="exercise-name">Lunges </div><span className="account-calpermin">{(Math.abs(result) / 9.33).toFixed(1)}</span> min<br/>
                        </div>
                        </div>
                    </div>
                </div>
            )
        };
        return (
            <div>
                <div>Today's Total Intake: <span className="not-exceeded-cal">{currDateCalorieSum}</span> Kcal</div>
                <div>You have <span className="not-exceeded-cal">{Math.abs(result)}</span> Kcal remaining</div>
            </div>
            );
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
                        <div className="manualFormOpenBtn lead-bmr-estimate-btn" onClick={(e) => leadToBMRpage(e)}>
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
                        <div className="updateProToggleBtn" onClick={(e) => props.handleVerification(e)}>
                            Click here to Close the form
                        </div>
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
                <div className="calorie-guide-wrapper">
                    {props.user ?
                    handleRemainingCalorie(props.user.user.bmr)
                    :
                    null}
                </div>
            </div>
        </div>
    )
}
export default Account;