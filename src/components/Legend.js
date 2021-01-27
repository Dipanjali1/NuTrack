import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../style/Legend.scss";

const Legend = (props) => {
    const {
        carbs,
        protein,
        fat,
        fiber
    } = props;

    useEffect(() => {
        carbRangeCalc();
        proteinRangeCalc();
        fatRangeCalc();
        fiberRangeCalc();
    })

    const carbRangeCalc = () => {
        // 45~65%
        let total = parseFloat(carbs) + parseFloat(protein) + parseFloat(fat) + parseFloat(fiber)
        let carbIntake = Math.ceil((parseFloat(carbs)/total)*100);
        const carbIntakeDOM = document.querySelector(".carbIntake");
        if(carbIntake < 45 && carbIntake > 30){
            carbIntakeDOM.style.color = "#3366CC";
            carbIntakeDOM.innerText = "Low";
        } else if(carbIntake >= 45 && carbIntake <= 65){
            carbIntakeDOM.style.color = "green";
            carbIntakeDOM.innerText = "Appropriate";
        } else if(carbIntake > 65 && carbIntake < 70){
            carbIntakeDOM.style.color = "#F84A04";
            carbIntakeDOM.innerText = "High";
        } else if(carbIntake > 70){
            carbIntakeDOM.style.color = "#880102";
            carbIntakeDOM.innerText = "Very High";
        } else if(carbIntake <= 30){
            carbIntakeDOM.style.color = "#A1A1A1";
            carbIntakeDOM.innerText = "Very Low";
        }
    }

    const proteinRangeCalc = () => {
        // 25~35%
        let total = parseFloat(carbs) + parseFloat(protein) + parseFloat(fat) + parseFloat(fiber)
        let proteinIntake = Math.ceil((parseFloat(protein)/total)*100);
        const proteinIntakeDOM = document.querySelector(".proteinIntake");
        if(proteinIntake < 25 && proteinIntake > 20){
            proteinIntakeDOM.style.color = "#3366CC";
            proteinIntakeDOM.innerText = "Low";
        } else if(proteinIntake >= 25 && proteinIntake <= 35){
            proteinIntakeDOM.style.color = "green";
            proteinIntakeDOM.innerText = "Appropriate";
        } else if(proteinIntake > 35 && proteinIntake < 45){
            proteinIntakeDOM.style.color = "#F84A04";
            proteinIntakeDOM.innerText = "High";
        } else if(proteinIntake > 45){
            proteinIntakeDOM.style.color = "#880102";
            proteinIntakeDOM.innerText = "Very High";
        } else if(proteinIntake <= 20){
            proteinIntakeDOM.style.color = "#A1A1A1";
            proteinIntakeDOM.innerText = "Very Low";
        }
    }

    const fatRangeCalc = () => {
        // 20~30%
        let total = parseFloat(carbs) + parseFloat(protein) + parseFloat(fat) + parseFloat(fiber)
        let fatIntake = Math.ceil((parseFloat(fat)/total)*100);
        const fatIntakeDOM = document.querySelector(".fatIntake");
        if(fatIntake < 20 && fatIntake > 10){
            fatIntakeDOM.style.color = "#3366CC";
            fatIntakeDOM.innerText = "Low";
        } else if(fatIntake >= 20 && fatIntake <= 30){
            fatIntakeDOM.style.color = "green";
            fatIntakeDOM.innerText = "Appropriate";
        } else if(fatIntake > 30 && fatIntake < 40){
            fatIntakeDOM.style.color = "#F84A04";
            fatIntakeDOM.innerText = "High";
        } else if(fatIntake > 40){
            fatIntakeDOM.style.color = "#880102";
            fatIntakeDOM.innerText = "Very High";
        } else if(fatIntake <= 10){
            fatIntakeDOM.style.color = "#A1A1A1";
            fatIntakeDOM.innerText = "Very Low";
        }
    }

    const fiberRangeCalc = () => {
        // 5~10%
        let total = parseFloat(carbs) + parseFloat(protein) + parseFloat(fat) + parseFloat(fiber)
        let fiberIntake = Math.ceil((parseFloat(fiber)/total)*100);
        const fiberIntakeDOM = document.querySelector(".fiberIntake");
        if(fiberIntake < 5 && fiberIntake > 3){
            fiberIntakeDOM.style.color = "#3366CC";
            fiberIntakeDOM.innerText = "Low";
        } else if(fiberIntake >= 5 && fiberIntake <= 10){
            fiberIntakeDOM.style.color = "green";
            fiberIntakeDOM.innerText = "Appropriate";
        } else if(fiberIntake > 10 && fiberIntake < 15){
            fiberIntakeDOM.style.color = "#F84A04";
            fiberIntakeDOM.innerText = "High";
        } else if(fiberIntake > 15){
            fiberIntakeDOM.style.color = "#880102";
            fiberIntakeDOM.innerText = "Very High";
        } else if(fiberIntake <= 3){
            fiberIntakeDOM.style.color = "#A1A1A1";
            fiberIntakeDOM.innerText = "Very Low";
        }
    }

    return (
        <div className="legendCont">
            <div><span className="carbLegendIcon"></span><span className="legendTitle">Total Carbs:</span> {carbs} g <span className="carbIntake"></span></div>
            <div><span className="proteinLegendIcon"></span><span className="legendTitle">Total Protein:</span> {protein} g <span className="proteinIntake"></span></div>
            <div><span className="fatLegendIcon"></span><span className="legendTitle">Total Fat:</span> {fat} g <span className="fatIntake"></span></div>
            <div><span className="fiberLegendIcon"></span><span className="legendTitle">Total Fiber:</span> {fiber} g <span className="fiberIntake"></span></div>
        </div>
    )
}
Legend.propTypes = {
    carbs: PropTypes.string.isRequired,
    protein: PropTypes.string.isRequired,
    fat: PropTypes.string.isRequired,
    fiber: PropTypes.string.isRequired
};
export default Legend;