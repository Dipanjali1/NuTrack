import React from "react";
import PropTypes from "prop-types";

const BMRform = (props) => {
    const {
        bmrInput,
        handleUpdateBMR,
        setBMRInput,
        leadToBMRpage
    } = props;

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
BMRform.propTypes = {
    bmrInput: PropTypes.string,
    handleUpdateBMR: PropTypes.func.isRequired,
    setBMRInput: PropTypes.func.isRequired,
    leadToBMRpage: PropTypes.func.isRequired
};
export default BMRform;