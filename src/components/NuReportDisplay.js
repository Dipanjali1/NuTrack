import React,{ useCallback, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import API from '../services/Api.js';
import NuReportItem from './NuReportItem.js';
import Legend from "./Legend.js";
import '../styles/NuReportDisplay.scss';

const NuReportDisplay = (props) => {
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0.000045);
    const [protein, setProtein] = useState(0.00003);
    const [fat, setFats] = useState(0.00002);
    const [fiber, setFiber] = useState(0.000005);
    const [reportData, setReportData] = useState([]);

    const chartData = [
        { title: "Carbs", value: carbs, color: "#E96255" },
        { title: "Protein", value: protein, color: "#EFC319" },
        { title: "Fat", value: fat, color: "#96C93D" },
        { title: "Fiber", value: fiber, color: "#58A5BD" },
      ];

    const handleNuCalc = useCallback((data) =>{
        if(data){
            let maxCal = 0;
            let maxCarbs = 0;
            let maxPro = 0;
            let maxFat = 0;
            let maxFiber = 0;
            data.forEach(item => {
                maxCal += item.calories;
                maxCarbs += item.carbs;
                maxPro += item.protein;
                maxFat += item.fat;
                maxFiber += item.fiber;
            })
            setCalories(maxCal);
            setCarbs(maxCarbs);
            setProtein(maxPro);
            setFats(maxFat);
            setFiber(maxFiber);
        } else {
            props.history.push('/');
        }
    }, [props]);

    const handleRenderReport = useCallback(() => {
        API.getReport(localStorage.getItem('user'), props.match.params.id)
        .catch(err => console.log(err))
        .then(data => {
            setReportData(data);
            handleNuCalc(data.intakes);
        });
    }, [props.match.params.id, handleNuCalc]);

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            props.history.push('/signin');
        } else {
            const checkBox = document.querySelector('.checkBox');
            if(checkBox.checked) checkBox.checked = false;
            if(!props.user) props.getUserInfo();
            if(!reportData.length) handleRenderReport();
        }
    }, [props, reportData.length, handleRenderReport])

    function handleFoodCards() {
        if(reportData.intakes){
            return reportData.intakes.map((food) => {
                return (
                    <NuReportItem food={food} key={food.id + Math.random()} />
                );
            });
        }
    }

    return (
        <div>
            {props.loading ?
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            :
            <div>
                <div className="nuReport-info">
                    {reportData.reportName ?
                    <div>
                        <div className="nuReport-title">{reportData.reportName}</div>
                        <div>Intake Date: {reportData.intakeDate}</div>
                        <div>Report Saved at: {reportData.created_at.split('T')[0]}</div>
                    </div>
                    :
                    null}
                </div>
                <div className="donutChart">
                    <div className="chart">
                        <PieChart
                            animate
                            animationDuration={800}
                            animationEasing="ease-out"
                            center={[50, 50]}
                            data={chartData}
                            lengthAngle={360}
                            lineWidth={75}
                            paddingAngle={2}
                            startAngle={0}
                            viewBoxSize={[100, 100]}
                            label={({ dataEntry }) =>
                            `${dataEntry.title}: ${Math.round(dataEntry.percentage)}%`
                            }
                            labelPosition={60}
                            labelStyle={{
                            fontSize: "5px",
                            fontColor: "FFFFA",
                            fontWeight: "800",
                            }}
                        ></PieChart>
                    </div>
                    <div className="calories">{calories}<br />Kcal</div>
                </div>
                <div className="legend-wrapper">
                    <Legend
                    carbs={carbs.toFixed(2)}
                    protein={protein.toFixed(2)}
                    fat={fat.toFixed(2)}
                    fiber={fiber.toFixed(2)}
                    />
                </div>
                <div className="nuReportFoodCardsCont">{handleFoodCards()}</div>
                {reportData.user_id && props.user.user.id !== reportData.user_id ?
                props.history.push('/')
                :   
                null}
            </div>}
        </div>
    )
}
export default NuReportDisplay;