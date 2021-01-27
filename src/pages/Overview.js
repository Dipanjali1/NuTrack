import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../services/Api.js";
import NuReportCard from "../components/NuReportCard.js";
import OverviewPieChart from "../components/OverviewPieChart.js";
import "../style/NuReportCard.scss";
import "../style/Overview.scss";
import Paper from "@material-ui/core/Paper";
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import Dropdown from "react-dropdown";
import Loading from "../components/Loading.js";
import "react-dropdown/style.css";

const Overview = (props) => {
    const {
        user,
        history,
        loading,
        getUserInfo,
    } = props;

    const [ nuReports, setNuReports ] = useState([]);
    const [ selectedYear, setSelectedYear ] = useState("");
    const [ selectedMonth, setSelectedMonth ] = useState("");
    const [ yearOptions, setYearOptions ] = useState([]);
    const [ monthOptions, setMonthOptions ] = useState([]);
    let filteredData = [];
    const nutritions = {};
    
    useEffect(() => {
        if(!localStorage.getItem("user")) {
            history.push("/signin")
        } else {
            const checkBox = document.querySelector(".checkBox");
            if(checkBox.checked) checkBox.checked = false;
            if(!user) getUserInfo();
            renderNuReports();
            handleSetYearOptions();
            handleSetMonthOptions();
        }
    }, [props])

    function handleSetYearOptions(){
        let currYear = new Date().getFullYear();
        let temp = ["------"];
        for(let i = currYear; i >= 2010; i--){
            temp.push(i);
        }
        setYearOptions(temp);
    }

    function handleSetMonthOptions(){
        let temp = ["------"];
        for(let i = 1; i <= 12; i++){
            temp.push(i);
        }
        setMonthOptions(temp);
    }

    function renderNuReports(){
        API.getReports(localStorage.getItem("user"))
        .catch(err => err)
        .then(data => {
            let sortedData = data.sort(function(a, b) {
                var keyA = new Date(a.created_at),
                  keyB = new Date(b.created_at);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            setNuReports(sortedData);
        });
    }

    function handleNuReportCard(){
        const arr = [];
        if(selectedYear !== "" && selectedMonth !== "" && selectedYear !== "------" && selectedMonth !== "------"){
            nuReports.forEach(report => {
                let reportYear = parseInt(report.intakeDate.split("-")[0]);
                let reportMonth = parseInt(report.intakeDate.split("-")[1]);
                if(reportYear === selectedYear && reportMonth === selectedMonth){
                    arr.push(report);
                }
            })
            return arr.map((report) => {
                return (
                    <NuReportCard key={report.id} report={report} renderNuReports={renderNuReports} />
                );
            });
        } else if(selectedYear === "" || selectedYear === "" || selectedYear === "------" || selectedMonth === "------"){
            return nuReports.map((report) => {
                return (
                    <NuReportCard key={report.id} report={report} renderNuReports={renderNuReports} />
                );
            });
        }
    }

    function handleNuCalculation(nutrition){
        let arr = [];
        let lastDate = new Date(selectedYear, selectedMonth, 0).getDate();
        for(let i = 1; i <= lastDate; i++){
            arr.push({ date: i.toString(), value: 0});
        }
        nuReports.forEach(report => {
            let reportYear = parseInt(report.intakeDate.split("-")[0]);
            let reportMonth = parseInt(report.intakeDate.split("-")[1]);
            if(reportYear === selectedYear && reportMonth === selectedMonth){
                let reportDate = parseInt(report.intakeDate.split("-")[2]);
                let totalNut = handleSumUpNut(report, nutrition);
                arr[reportDate-1].value += totalNut;
            }
        })
        filteredData = arr;
        nutritions[nutrition] = filteredData;
    }

    function handleSumUpNut(report, nutrition){
        let total = 0;
        report.intakes.forEach(intake => {
            total += intake[nutrition]
        })
        return total;
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function renderNuCharts(){
        let nutrition = ["calories", "carbs", "protein", "fat", "fiber"];
        let colors = ["#58A5BD", "#96C93D", "#EFC319", "#E96255", "#00B0B1"];
        return nutrition.map(nutrition => {
            let scale = nutrition === "calories" ? "(Kcal)" : "(g)";
            let color = colors.pop();
            if(selectedYear !== 0 && selectedMonth !== 0){
                handleNuCalculation(nutrition);
            }
            return (
                <div className="each-chart" key={nutrition}>
                    <Paper className="paper-chart">
                        <Chart data={filteredData}>
                            <ArgumentAxis />
                            <ValueAxis max={31} />
                            <BarSeries
                                valueField="value"
                                argumentField="date"
                                color={color}
                                barWidth={1.3}
                            />
                            <Title text={`${capitalizeFirstLetter(nutrition)} ${scale}`} />
                            <Animation />
                        </Chart>
                    </Paper>
                </div>
                )
        })
    }

    function handleStringifyMonth(){
        if(!isNaN(selectedMonth)){
            if(selectedYear === "" || selectedMonth === "") return "";
            let date = new Date(selectedYear, selectedMonth-1);
            if(isNaN(date.getTime())) return "";
            return date.toLocaleString("en-us", { month: "long" });
        }
    }

    function handleOverviewPieChart(){
        let nutrition = ["carbs", "protein", "fat", "fiber"];
        return nutrition.map(el => {
            return <OverviewPieChart nutritions={nutritions} curr={el} key={el} />
        })
    }

    function handleSelectedYear(){
        if(selectedYear === "------") return "";
        return selectedYear;
    }

    return (
        <div>
        {loading ?
        <Loading />
        :
        <div className="overview-wrapper">
            <div className="dropdown-menu-date-selection">
                <Dropdown className="drop-down-year" options={yearOptions} onChange={(e) => setSelectedYear(e.value)} value={"Select a year"} placeholder="Select a year" />
                <Dropdown className="drop-down-month" options={monthOptions} onChange={(e) => setSelectedMonth(e.value)} value={"Select a month"} placeholder="Select a month" />
            </div>
            <div className="nuReportCardsCont">
                {handleNuReportCard()}
            </div>
            <h1 className="overview-date-year-title">{handleStringifyMonth()} {handleSelectedYear()}</h1>
            <div>
                {handleOverviewPieChart()}
            </div>
            <div className="plot-container">
                <div className="inner-plot-container">
                    {renderNuCharts()}
                </div>
            </div>
        </div>}
        </div>
    )
}
Overview.propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUserInfo: PropTypes.func.isRequired,
};
export default Overview;