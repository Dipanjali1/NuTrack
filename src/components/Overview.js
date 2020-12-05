import React, { useEffect, useState } from "react";
import API from '../services/Api.js';
import NuReportCard from './NuReportCard.js';
import '../styles/NuReportCard.scss';
import '../styles/Overview.scss';
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Overview = (props) => {
    const [ nuReports, setNuReports ] = useState([]);
    const [ selectedYear, setSelectedYear ] = useState('');
    const [ selectedMonth, setSelectedMonth ] = useState('');
    const [ yearOptions, setYearOptions ] = useState([]);
    const [ monthOptions, setMonthOptions ] = useState([]);
    let filteredData = [];
    
    useEffect(() => {
        if(!localStorage.getItem('user')) {
            props.history.push('/signin')
        } else {
            const checkBox = document.querySelector('.checkBox');
            if(checkBox.checked) checkBox.checked = false;
            if(!props.user) props.getUserInfo();
            renderNuReports();
            handleSetYearOptions();
            handleSetMonthOptions();
        }
    }, [props])

    function handleSetYearOptions(){
        let currYear = new Date().getFullYear();
        let temp = [];
        for(let i = currYear; i >= 2010; i--){
            temp.push(i);
        }
        setYearOptions(temp);
    }

    function handleSetMonthOptions(){
        let currMonth = new Date().getMonth();
        let temp = [];
        for(let i = currMonth+1; i >= 1; i--){
            temp.push(i);
        }
        setMonthOptions(temp);
    }

    function renderNuReports(){
        API.getReports(localStorage.getItem('user'))
        .then(data => {
            setNuReports(data);
        });
    }

    function handleNuReportCard(){
        return nuReports.map((report) => {
            return (
                <NuReportCard key={report.id} report={report} renderNuReports={renderNuReports} />
            );
        });
    }

    function handleNuCalculation(nutrition){
        let arr = [];
        let lastDate = new Date(selectedYear, selectedMonth, 0).getDate();
        for(let i = 1; i <= lastDate; i++){
            arr.push({ date: i.toString(), value: 0});
        }
        nuReports.map(report => {
            let reportYear = new Date(report.intakeDate).getFullYear();
            let reportMonth = new Date(report.intakeDate).getMonth() + 1;
            if(reportYear === selectedYear && reportMonth === selectedMonth){
                let reportDate = new Date(report.intakeDate).getDate();
                let totalNut = handleSumUpNut(report, nutrition);
                arr[reportDate-1].value += totalNut;
            }
        })
        filteredData = arr;
    }

    function handleSumUpNut(report, nutrition){
        let total = 0;
        report.intakes.map(intake => {
            total += intake[nutrition]
        })
        return total;
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function renderNuCharts(){
        let nutrition = ['calories', 'carbs', 'protein', 'fat', 'fiber'];
        let colors = ["#58A5BD", "#96C93D", "#EFC319", "#E96255", "#00B0B1"];
        return nutrition.map(nutrition => {
            let color = colors.pop();
            if(selectedYear !== 0 && selectedMonth !== 0){
                handleNuCalculation(nutrition);
            }
            return (
                <div className="each-chart">
                    <Paper>
                        <Chart data={filteredData}>
                            <ArgumentAxis />
                            <ValueAxis max={7} />
                            <BarSeries
                                valueField="value"
                                argumentField="date"
                                color={color}
                            />
                            <Title text={`${handleStringifyMonth()} ${selectedYear} ${capitalizeFirstLetter(nutrition)} Intake`} />
                            <Animation />
                        </Chart>
                    </Paper>
                </div>
                )
        })
    }

    function handleStringifyMonth(){
        if(!isNaN(selectedMonth)){
            switch (selectedMonth) {
                case '':
                  return '';
                case 1:
                  return "January,";
                case 2:
                  return "February,";
                case 3:
                   return "March,";
                case 4:
                   return "April,";
                case 5:
                   return "May,";
                case 6:
                   return "June,";
                case 7:
                   return "July,";
                case 8:
                   return "August,";
                case 9:
                   return "September,";
                case 10:
                   return "October,";
                case 11:
                   return "November,";
                case 12:
                   return "December,";
              }
        }
    }

    return (
        <div className="overview-wrapper">
            <div className="dropdown-menu-date-selection">
                <Dropdown className="drop-down-year" options={yearOptions} onChange={(e) => setSelectedYear(e.value)} value={"Select a year"} placeholder="Select a year" />
                <Dropdown className="drop-down-month" options={monthOptions} onChange={(e) => setSelectedMonth(e.value)} value={"Select a month"} placeholder="Select a month" />
            </div>
            <div className="nuReportCardsCont">
                {handleNuReportCard()}
            </div>
            <div className="plot-container">
                {renderNuCharts()}
            </div>
        </div>
    )
}
export default Overview;