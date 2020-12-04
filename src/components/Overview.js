import React, { useEffect, useState } from "react";
import API from '../services/Api.js';
import NuReportCard from './NuReportCard.js';
import '../styles/NuReportCard.scss';

const Overview = (props) => {
    const [ nuReports, setNuReports ] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            props.history.push('/signin')
        } else {
            const checkBox = document.querySelector('.checkBox');
            if(checkBox.checked) checkBox.checked = false;
            if(!props.user) props.getUserInfo();
            renderNuReports();
        }
    }, [props])

    function renderNuReports(){
        API.getReports(localStorage.getItem('user'))
        .then(data => {
            setNuReports(data)
        });
    }

    function handleNuReportCard(){
        return nuReports.map((report) => {
            return (
                <NuReportCard key={report.id} report={report} renderNuReports={renderNuReports} />
            );
        });
    }

    return (
        <div>
            <div className="nuReportCardsCont">
                {handleNuReportCard()}
            </div>
            <div>

            </div>
        </div>
    )
}
export default Overview;