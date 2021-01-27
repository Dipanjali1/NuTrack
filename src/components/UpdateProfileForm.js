import React from "react";
import PropTypes from "prop-types";

const UpdateProfileForm = (props) => {
    const {
        newPasswordInput,
        newPasswordConfirmationInput,
        newNameInput,
        newEmailInput,
        handleUpdateProfile,
        handleVerification,
        setNewPasswordInput,
        setNewPasswordConfirmationInput,
        setNewNameInput,
        setNewEmailInput
    } = props;

    return (
        <React.Fragment>
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
                <div className="updateProToggleBtn" onClick={(e) => handleVerification(e)}>
                    Click here to Close the form
                </div>
            </form>
        </React.Fragment>
    )
}
UpdateProfileForm.propTypes = {        
    newPasswordInput: PropTypes.string.isRequired,
    newPasswordConfirmationInput: PropTypes.string.isRequired,
    newNameInput: PropTypes.string.isRequired,
    newEmailInput: PropTypes.string.isRequired,
    handleUpdateProfile: PropTypes.func.isRequired,
    handleVerification: PropTypes.func.isRequired,
    setNewPasswordInput: PropTypes.func.isRequired,
    setNewPasswordConfirmationInput: PropTypes.func.isRequired,
    setNewNameInput: PropTypes.func.isRequired,
    setNewEmailInput: PropTypes.func.isRequired,
};
export default UpdateProfileForm;