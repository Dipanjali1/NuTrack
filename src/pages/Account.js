import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../style/Account.scss";
import API from "../services/Api.js";
import CalorieBurnSuggestion from "../components/CalorieBurnSuggestion.js";
import Loading from "../components/Loading.js";
import Profile from "../components/Profile.js";
import BMRform from "../components/BMRform.js";
import AccountSubMenu from "../components/AccountSubMenu.js";
import UpdateProfileForm from "../components/UpdateProfileForm.js";
import AccountDeleteForm from "../components/AccountDeleteForm.js";

const Account = (props) => {
    const {
        user,
        history,
        loading,
        verified,
        updateClicked,
        deleteClicked,
        getUserInfo,
        setLoading,
        setVerified,
        handleVerification
    } = props;

    const [ bmrInput, setBMRInput ] = useState("");
    const [ newPasswordInput, setNewPasswordInput ] = useState("");
    const [ newPasswordConfirmationInput, setNewPasswordConfirmationInput ] = useState("");
    const [ newNameInput, setNewNameInput ] = useState("");
    const [ newEmailInput, setNewEmailInput ] = useState("");
    const [ updateBMRclicked, setUpdateBMRclicked ] = useState(false);
    const [ currDateCalorieSum, setCurrDateCalorieSum ] = useState(0);

    useEffect(() => {
        const checkBox = document.querySelector(".checkBox");
        if(checkBox.checked){
          checkBox.checked = false;
        }
        if(!user){
            getUserInfo();
        }
    }, [props])

    function handleUpdateBMR(e){
        e.preventDefault();
        if(window.confirm("Are you sure you want to update BMR?")){
            if(bmrInput > 0){
                setLoading(true);
                API.updateBMR(localStorage.getItem("user"), bmrInput)
                .catch(err => err)
                .then(() => {
                    setBMRInput("");
                    getUserInfo();
                    setLoading(false);
                });
            }
        } else {
            return null;
        }
    }

    function handleUpdateProfile(e){
        e.preventDefault();
        if(window.confirm("Are you sure you want to update profile?")){
            if(newPasswordConfirmationInput !== newPasswordInput) return alert("Password and confirm password does not match");
            if(newPasswordInput.length >= 6 || newNameInput === "" || newEmailInput === ""){
                setLoading(true);
                API.updateProfile(localStorage.getItem("user"), newPasswordInput, newNameInput, newEmailInput)
                .catch(err => err)
                .then(() => {
                    setNewPasswordInput("");
                    setNewPasswordConfirmationInput("");
                    setNewNameInput("");
                    setNewEmailInput("");
                    setVerified(false);
                    getUserInfo();
                    setLoading(false);
                });
            } else {
                console.log("Update Fail");
                return alert("Any input cannot be blank and Password has to be longer than 6");
            }
        } else {
            return null;
        }
    }

    function handleAccountDelete(e, user){
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete account?")){
            setLoading(true);
            API.deleteAccount(localStorage.getItem("user"), user.username)
            .catch(err => err)
            .then(data => {
                if(!data.error){
                    localStorage.removeItem("user");
                    setLoading(false);
                    alert(data.message)
                    history.push("/");
                }
            })
        }
    }

    function leadToBMRpage(){
        history.push("/BMRestimate");
    }

    function handleUpdateBMRbtn(e){
        e.preventDefault();
        setVerified(false);
        if(!updateBMRclicked){
            setUpdateBMRclicked(true);
        }
    }

    function renderNuReports(){
        API.getReports(localStorage.getItem("user"))
        .catch(err => err)
        .then(data => {
            handleTotalCalIntake(data);
        });
    }

    function handleTotalCalIntake(data){
        if(localStorage.getItem("user")){
            let sum = 0;
            data.forEach(data => {
                let currMonth = new Date().getMonth() + 1;
                let currYear = new Date().getFullYear();
                let currDate = new Date().getDate();
                let reportMonth = parseInt(data.intakeDate.split("-")[1]);
                let reportYear = parseInt(data.intakeDate.split("-")[0]);
                let reportDate = parseInt(data.intakeDate.split("-")[2]);
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
            <AccountSubMenu
                history={history}
                handleVerification={handleVerification}
                handleUpdateBMRbtn={handleUpdateBMRbtn}
            />
            {loading ?
            <Loading />
            :
            <div className="account-info">
                {user ? 
                <Profile 
                    user={user} 
                    handleRemainingCalorie={handleRemainingCalorie}
                />
                :
                null}
                <div className="account-bmr-form-wrapper">
                    {updateBMRclicked ?
                    <BMRform
                        handleUpdateBMR={handleUpdateBMR}
                        bmrInput={bmrInput}
                        setBMRInput={setBMRInput}
                        leadToBMRpage={leadToBMRpage}
                    />
                    : 
                    null}
                </div>
                <div className="update-profile-form">
                    {verified && updateClicked ?
                    <UpdateProfileForm
                        handleUpdateProfile={handleUpdateProfile}
                        setNewPasswordInput={setNewPasswordInput}
                        setNewPasswordConfirmationInput={setNewPasswordConfirmationInput}
                        setNewNameInput={setNewNameInput}
                        setNewEmailInput={setNewEmailInput}
                        newPasswordInput={newPasswordInput}
                        newPasswordConfirmationInput={newPasswordConfirmationInput}
                        newNameInput={newNameInput}
                        newEmailInput={newEmailInput}
                        handleVerification={handleVerification}
                    />
                    :
                    null}
                </div>
                <div className="delete-column-container">
                    {verified && deleteClicked ?
                    <AccountDeleteForm
                        user={user}
                        handleAccountDelete={handleAccountDelete}
                    />
                    :
                    null}
                </div>
            </div>}
        </div>
    )
}
Account.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    verified: PropTypes.bool.isRequired,
    updateClicked: PropTypes.bool.isRequired,
    deleteClicked: PropTypes.bool.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setVerified: PropTypes.func.isRequired,
    handleVerification: PropTypes.func.isRequired
};
export default Account;