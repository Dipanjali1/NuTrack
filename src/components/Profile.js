import React from "react";
import PropTypes from "prop-types";

const Profile = (props) => {
    const {
        user,
        handleRemainingCalorie
    } = props;

    return (
        <div>
            <h1>Profile</h1>
            <div className="line"></div>
            <div><strong>Username:</strong> {user.user.username}</div>
            <div><strong>Name:</strong> {user.user.name}</div>
            <div><strong>Email:</strong> {user.user.email}</div>
            <div><strong>BMR:</strong> {user.user.bmr}</div>
            <div className="calorie-guide-wrapper">
                {handleRemainingCalorie(user.user.bmr)}
            </div>
        </div>
    )
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    handleRemainingCalorie: PropTypes.func.isRequired
};
export default Profile;