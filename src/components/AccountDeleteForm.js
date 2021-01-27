import React from "react";
import PropTypes from "prop-types";

const AccountDeleteForm = (props) => {
    const {
        user,
        handleAccountDelete,
    } = props;

    return (
        <React.Fragment>
            <div className="delete-form-wrapper">
                <div className="delete-inner-wrapper">
                    <h2>Delete Account</h2>
                    <div className="line"></div>
                    <div>
                        Once you delete your account, there is no going back. Please be certain
                    </div>
                    <button className="delete-account-btn" onClick={(e) => handleAccountDelete(e, user.user)}>
                        DELETE YOUR ACCOUNT
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}
AccountDeleteForm.propTypes = {
    user: PropTypes.object.isRequired,
    handleAccountDelete: PropTypes.func.isRequired,
};
export default AccountDeleteForm;