import React, { useState, useEffect } from 'react';
import { PieChart } from "react-minimal-pie-chart";
import '../style/OverviewPieChart.scss';

const OverviewPieChart = (props) => {
    const [ totalNutrition, setTotalNutrition ] = useState(0);
    const [ totalCurrNutrition, setTotalCurrNutrition ] = useState(0);
    const [ currColor, setCurrColor ] = useState('');

    useEffect(() => {
        handleTotalNutritionCalc();
        handleCalcNutrition();
    });

    let chartData = [
        { title: props.curr, value: totalCurrNutrition, color: currColor },
        { title: 'empty', value: totalNutrition-totalCurrNutrition, color: "#E0E0E0" }
    ];

    function handleTotalNutritionCalc(){
        let sum = 0;
        let nutrition = ['carbs', 'protein', 'fat', 'fiber'];
        let colors = {
            'carbs': "#E96255",
            'protein': "#EFC319",
            'fat': "#96C93D",
            'fiber': "#58A5BD"
        };
        nutrition.forEach(name => {
            props.nutritions[name].map(el => {
                sum += el.value;
            })
        })
        setTotalNutrition(sum);
        setCurrColor(colors[props.curr]);
    }

    function handleCalcNutrition(){
        let sum = 0;
        props.nutritions[props.curr].map(el => {
            sum += el.value;
        })
        setTotalCurrNutrition(sum);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handlePercentageCalc(){
        let result = ((totalCurrNutrition / totalNutrition)*100).toFixed(1);
        return isNaN(result) ? 0 : result;
    }

    return (
        <div className="pieChart-container">
            <div className="overview-donutChart">
                <div className="overview-chart">
                    <PieChart
                        animate
                        animationDuration={800}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        data={chartData}
                        lengthAngle={360}
                        lineWidth={3}
                        paddingAngle={0}
                        startAngle={0}
                        viewBoxSize={[100, 100]}
                        labelPosition={60}
                        labelStyle={{
                        fontSize: "5px",
                        fontColor: "FFFFA",
                        fontWeight: "800",
                        }}
                    ></PieChart>
                </div>
                <div className={"percentage-info-wrapper-"+props.curr}>
                    <div className="percentage-title">{capitalizeFirstLetter(props.curr)}</div>
                    <div className="percentage-number">{handlePercentageCalc()} <span className="percent">%</span></div>
                </div>
            </div>
        </div>
    )
}
export default OverviewPieChart;