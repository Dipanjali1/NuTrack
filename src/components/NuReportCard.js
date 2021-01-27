import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import API from "../services/Api.js";
import "../style/NuReportCard.scss";

const NuReportCard = (props) => {
    const {
        report,
        renderNuReports,
    } = props;

    function handleDeleteReport(e, report){
        e.preventDefault();
        if(window.confirm(`Are you sure you want to delete the ${report.reportName} report?`)){
            API.deleteReport(localStorage.getItem("user"), report.id)
            .catch(err => err)
            .then(() => renderNuReports());
        }
    }

    return (
        <div className="nuReportCard">
            <button className="report-delete-btn" onClick={(e) => handleDeleteReport(e, report)}>X</button>
            <Link to={`overview/nutrition_reports/${report.id}`} className="report-card-link">
                <div className="nuReportCard-inner-wrapper">
                    <div className="report-info-div">
                        <div className="report-name">{report.reportName}</div>
                        <div>{report.intakeDate}</div>
                        <div>Intakes: {report.intakes.length}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
NuReportCard.propTypes = {
    report: PropTypes.object.isRequired,
    renderNuReports: PropTypes.func.isRequired,
};
export default NuReportCard;