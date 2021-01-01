import React, { useEffect } from 'react';
import '../styles/Legend.scss';

const Legend = (props) => {
    useEffect(() => {
        carbRangeCalc();
        proteinRangeCalc();
        fatRangeCalc();
        fiberRangeCalc();
    })

    const carbRangeCalc = () => {
        // 45~65%
        let total = parseFloat(props.carbs) + parseFloat(props.protein) + parseFloat(props.fat) + parseFloat(props.fiber)
        let carbIntake = Math.ceil((parseFloat(props.carbs)/total)*100);
        if(carbIntake < 45 && carbIntake > 30){
            document.querySelector('.carbIntake').style.color = '#3366CC';
            document.querySelector('.carbIntake').innerText = 'Low';
        } else if(carbIntake >= 45 && carbIntake <= 65){
            document.querySelector('.carbIntake').style.color = 'green';
            document.querySelector('.carbIntake').innerText = 'Appropriate';
        } else if(carbIntake > 65 && carbIntake < 70){
            document.querySelector('.carbIntake').style.color = '#F84A04';
            document.querySelector('.carbIntake').innerText = 'High';
        } else if(carbIntake > 70){
            document.querySelector('.carbIntake').style.color = '#880102';
            document.querySelector('.carbIntake').innerText = 'Very High';
        } else if(carbIntake <= 30){
            document.querySelector('.carbIntake').style.color = '#A1A1A1';
            document.querySelector('.carbIntake').innerText = 'Very Low';
        }
    }

    const proteinRangeCalc = () => {
        // 25~35%
        let total = parseFloat(props.carbs) + parseFloat(props.protein) + parseFloat(props.fat) + parseFloat(props.fiber)
        let proteinIntake = Math.ceil((parseFloat(props.protein)/total)*100);
        if(proteinIntake < 25 && proteinIntake > 20){
            document.querySelector('.proteinIntake').style.color = '#3366CC';
            document.querySelector('.proteinIntake').innerText = 'Low';
        } else if(proteinIntake >= 25 && proteinIntake <= 35){
            document.querySelector('.proteinIntake').style.color = 'green';
            document.querySelector('.proteinIntake').innerText = 'Appropriate';
        } else if(proteinIntake > 35 && proteinIntake < 45){
            document.querySelector('.proteinIntake').style.color = '#F84A04';
            document.querySelector('.proteinIntake').innerText = 'High';
        } else if(proteinIntake > 45){
            document.querySelector('.proteinIntake').style.color = '#880102';
            document.querySelector('.proteinIntake').innerText = 'Very High';
        } else if(proteinIntake <= 20){
            document.querySelector('.proteinIntake').style.color = '#A1A1A1';
            document.querySelector('.proteinIntake').innerText = 'Very Low';
        }
    }

    const fatRangeCalc = () => {
        // 20~30%
        let total = parseFloat(props.carbs) + parseFloat(props.protein) + parseFloat(props.fat) + parseFloat(props.fiber)
        let fatIntake = Math.ceil((parseFloat(props.fat)/total)*100);
        if(fatIntake < 20 && fatIntake > 10){
            document.querySelector('.fatIntake').style.color = '#3366CC';
            document.querySelector('.fatIntake').innerText = 'Low';
        } else if(fatIntake >= 20 && fatIntake <= 30){
            document.querySelector('.fatIntake').style.color = 'green';
            document.querySelector('.fatIntake').innerText = 'Appropriate';
        } else if(fatIntake > 30 && fatIntake < 40){
            document.querySelector('.fatIntake').style.color = '#F84A04';
            document.querySelector('.fatIntake').innerText = 'High';
        } else if(fatIntake > 40){
            document.querySelector('.fatIntake').style.color = '#880102';
            document.querySelector('.fatIntake').innerText = 'Very High';
        } else if(fatIntake <= 10){
            document.querySelector('.fatIntake').style.color = '#A1A1A1';
            document.querySelector('.fatIntake').innerText = 'Very Low';
        }
    }

    const fiberRangeCalc = () => {
        // 5~10%
        let total = parseFloat(props.carbs) + parseFloat(props.protein) + parseFloat(props.fat) + parseFloat(props.fiber)
        let fiberIntake = Math.ceil((parseFloat(props.fiber)/total)*100);
        if(fiberIntake < 5 && fiberIntake > 3){
            document.querySelector('.fiberIntake').style.color = '#3366CC';
            document.querySelector('.fiberIntake').innerText = 'Low';
        } else if(fiberIntake >= 5 && fiberIntake <= 10){
            document.querySelector('.fiberIntake').style.color = 'green';
            document.querySelector('.fiberIntake').innerText = 'Appropriate';
        } else if(fiberIntake > 10 && fiberIntake < 15){
            document.querySelector('.fiberIntake').style.color = '#F84A04';
            document.querySelector('.fiberIntake').innerText = 'High';
        } else if(fiberIntake > 15){
            document.querySelector('.fiberIntake').style.color = '#880102';
            document.querySelector('.fiberIntake').innerText = 'Very High';
        } else if(fiberIntake <= 3){
            document.querySelector('.fiberIntake').style.color = '#A1A1A1';
            document.querySelector('.fiberIntake').innerText = 'Very Low';
        }
    }

    return (
        <div className="legendCont">
            <div><span className="carbLegendIcon"></span><span className="legendTitle">Total Carbs:</span> {props.carbs} g <span className="carbIntake"></span></div>
            <div><span className="proteinLegendIcon"></span><span className="legendTitle">Total Protein:</span> {props.protein} g <span className="proteinIntake"></span></div>
            <div><span className="fatLegendIcon"></span><span className="legendTitle">Total Fat:</span> {props.fat} g <span className="fatIntake"></span></div>
            <div><span className="fiberLegendIcon"></span><span className="legendTitle">Total Fiber:</span> {props.fiber} g <span className="fiberIntake"></span></div>
        </div>
    )
}
export default Legend;