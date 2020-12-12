import React, { useEffect } from 'react';
import '../styles/Main.scss';

const CalorieBurnSuggestion = (props) => {

    return (
        <div className="calorie-burn-suggestion-container">
            {props.result < 0 ?
            <div className="exceeded-burn-cal-suggestion-wrapper">
                <div><strong>Today's Total Intake:</strong> <span className="not-exceeded-cal">{props.currDateCalorieSum}</span> Kcal</div>
                <div><strong>You've exceeded</strong> <span className="exceeded-cal">{Math.abs(props.result)}</span> Kcal</div>
                    <div className="inner-calorie-burn-wrapper">
                <div className="account-exercise-title">To Burn this</div>
                <div className="burnThis-line"></div>
                    <div>
                        <div className="exercise-name">Walking </div><span className="account-calpermin">{(Math.abs(props.result) / 7.6).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Running </div> <span className="account-calpermin">{(Math.abs(props.result) / 13.2).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Push Ups </div> <span className="account-calpermin">{(Math.abs(props.result) / 7).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Sit Ups </div> <span className="account-calpermin">{(Math.abs(props.result) / 9).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Plank </div> <span className="account-calpermin">{(Math.abs(props.result) / 5).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Bicycle Crunch </div> <span className="account-calpermin">{(Math.abs(props.result) / 3).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Burpees </div><span className="account-calpermin">{(Math.abs(props.result) / 9.4).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Squat </div><span className="account-calpermin">{(Math.abs(props.result) / 8).toFixed(1)}</span> min<br/>
                        <div className="exercise-name">Lunges </div><span className="account-calpermin">{(Math.abs(props.result) / 9.33).toFixed(1)}</span> min<br/>
                    </div>
                </div>
            </div>
            :
            <div>
                <div>Today's Total Intake: <span className="not-exceeded-cal">{props.currDateCalorieSum}</span> Kcal</div>
                <div>You have <span className="not-exceeded-cal">{Math.abs(props.result)}</span> Kcal remaining</div>
            </div>}
        </div>
    )
}
export default CalorieBurnSuggestion;