import React from "react";
import PropTypes from "prop-types";

const AccountSubMenu = (props) => {
    const {
        history,
        handleVerification,
        handleUpdateBMRbtn,
    } = props;

    return (
        <React.Fragment>
            <div className="account-menu">
                <div className="update updateProToggleBtn" onClick={(e) => handleVerification(history, e)}>
                    Update Profile
                </div>
                <div className="update-bmr" onClick={(e) => handleUpdateBMRbtn(e)}>
                    Update BMR
                </div>
                <div className="delete delete-account" onClick={(e) => handleVerification(history, e)}>
                    Delete Account
                </div>
            </div>
        </React.Fragment>
    )
}
AccountSubMenu.propTypes = {
    history: PropTypes.object.isRequired,
    handleUpdateBMRbtn: PropTypes.func.isRequired,
    handleVerification: PropTypes.func.isRequired
};
export default AccountSubMenu;