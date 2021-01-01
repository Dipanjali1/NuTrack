import React from "react";
import { Link } from 'react-router-dom';
import API from '../services/Api.js';
import '../styles/NuReportCard.scss';

const NuReportCard = (props) => {
    function handleDeleteReport(e, report){
        e.preventDefault();
        if(window.confirm(`Are you sure you want to delete the ${report.reportName} report?`)){
            API.deleteReport(localStorage.getItem('user'), report.id)
            .catch(err => console.log(err))
            .then(data => {props.renderNuReports()});
        }
    }

    return (
        <div className="nuReportCard">
            <button className="report-delete-btn" onClick={(e) => handleDeleteReport(e, props.report)}>X</button>
            <Link to={`overview/nutrition_reports/${props.report.id}`} className="report-card-link">
                <div className="nuReportCard-inner-wrapper">
                    <div className="report-info-div">
                        <div className="report-name">{props.report.reportName}</div>
                        <div>{props.report.intakeDate}</div>
                        <div>Intakes: {props.report.intakes.length}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default NuReportCard;