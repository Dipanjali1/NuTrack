import React,{ useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PieChart } from "react-minimal-pie-chart";
import API from "../services/Api.js";
import NuReportItem from "../components/NuReportItem.js";
import Legend from "../components/Legend.js";
import Loading from "../components/Loading.js";
import "../style/NuReportDisplay.scss";

const NuReportDisplay = (props) => {
    const {
        user,
        history,
        match,
        loading,
        getUserInfo,
    } = props;

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
            history.push("/");
        }
    }, [props]);

    const handleRenderReport = useCallback(() => {
        API.getReport(localStorage.getItem("user"), match.params.id)
        .catch(err => err)
        .then(data => {
            setReportData(data);
            handleNuCalc(data.intakes);
        });
    }, [match.params.id, handleNuCalc]);

    useEffect(() => {
        if(!localStorage.getItem("user")) {
            history.push("/signin");
        } else {
            const checkBox = document.querySelector(".checkBox");
            if(checkBox.checked) checkBox.checked = false;
            if(!user) getUserInfo();
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
            {loading ?
            <Loading />
            :
            <div>
                <div className="nuReport-info">
                    {reportData.reportName ?
                    <div>
                        <div className="nuReport-title">{reportData.reportName}</div>
                        <div>Intake Date: {reportData.intakeDate}</div>
                        <div>Report Saved at: {reportData.created_at.split("T")[0]}</div>
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
                        />
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
                {reportData.user_id && user.user.id !== reportData.user_id ? history.push("/") : null}
            </div>}
        </div>
    )
}
NuReportDisplay.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUserInfo: PropTypes.func.isRequired
};
export default NuReportDisplay;