import React from "react";
import PropTypes from "prop-types";
import "../style/Main.scss";

const CalorieBurnSuggestion = (props) => {
    const {
        result,
        currDateCalorieSum
    } = props;

    function timeConverter(totalMin){
        if(totalMin > 60){
          var num = totalMin;
          var hours = (num / 60);
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          return rhours + " hr " + rminutes + " min";
        }
        return totalMin + " min";
      }

    return (
        <div className="calorie-burn-suggestion-container">
            {result < 0 ?
            <div className="exceeded-burn-cal-suggestion-wrapper">
                <div><strong>Today&apos;s Total Intake:</strong> <span className="not-exceeded-cal">{currDateCalorieSum}</span> Kcal</div>
                <div><strong>You&apos;ve exceeded</strong> <span className="exceeded-cal">{Math.abs(result)}</span> Kcal</div>
                    <div className="inner-calorie-burn-wrapper">
                <div className="account-exercise-title">To Burn this</div>
                <div className="burnThis-line"></div>
                    <div>
                        <div className="exercise-name">Walking </div><span className="account-calpermin">{timeConverter((Math.abs(result) / 7.6).toFixed(1))}</span><br/>
                        <div className="exercise-name">Running </div> <span className="account-calpermin">{timeConverter((Math.abs(result) / 13.2).toFixed(1))}</span><br/>
                        <div className="exercise-name">Push Ups </div> <span className="account-calpermin">{timeConverter((Math.abs(result) / 7).toFixed(1))}</span><br/>
                        <div className="exercise-name">Sit Ups </div> <span className="account-calpermin">{timeConverter((Math.abs(result) / 9).toFixed(1))}</span><br/>
                        <div className="exercise-name">Plank </div> <span className="account-calpermin">{timeConverter((Math.abs(result) / 5).toFixed(1))}</span><br/>
                        <div className="exercise-name">Bicycle Crunch </div> <span className="account-calpermin">{timeConverter((Math.abs(result) / 3).toFixed(1))}</span><br/>
                        <div className="exercise-name">Burpees </div><span className="account-calpermin">{timeConverter((Math.abs(result) / 9.4).toFixed(1))}</span><br/>
                        <div className="exercise-name">Squat </div><span className="account-calpermin">{timeConverter((Math.abs(result) / 8).toFixed(1))}</span><br/>
                        <div className="exercise-name">Lunges </div><span className="account-calpermin">{timeConverter((Math.abs(result) / 9.33).toFixed(1))}</span><br/>
                    </div>
                </div>
            </div>
            :
            <div>
                <div>Today&apos;s Total Intake: <span className="not-exceeded-cal">{currDateCalorieSum}</span> Kcal</div>
                <div>You have <span className="not-exceeded-cal">{Math.abs(result)}</span> Kcal remaining</div>
            </div>}
        </div>
    )
}
CalorieBurnSuggestion.propTypes = {
    result: PropTypes.number.isRequired,
    currDateCalorieSum: PropTypes.number.isRequired
};
export default CalorieBurnSuggestion;