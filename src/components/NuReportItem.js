import React from "react";
import PropTypes from "prop-types";
import "../style/FoodCard.scss";

const NuReportItem = (props) => {
    const {
        food,
    } = props;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const handleDetail = (e) => {
        const parentNodeDOM = e.target.parentNode.parentNode;
        if (parentNodeDOM.style.overflow === "visible"){
            parentNodeDOM.style.overflow = "hidden";
            parentNodeDOM.style.height = "4.5em";
            e.target.innerText = "More Detail"
        } else {
            parentNodeDOM.style.overflow = "visible";
            parentNodeDOM.style.height = "10em";
            e.target.innerText = "Show Less"
        }
    }

    return (
        <div className="foodCard" data-id={food.id}>
            <div className="innerCard">
                <div>
                    <strong>{capitalizeFirstLetter(food.name)}</strong>
                </div>
                <div><span className="details">Qty:</span> {food.quantity}</div>
                <div className="moreDetail" onClick={(e) => handleDetail(e)}>More Detail</div>
                <div><span className="details">Carbs:</span> {food.carbs.toFixed(2)}g</div>
                <div><span className="details">Protein: </span> {food.protein.toFixed(2)}g</div>
                <div><span className="details">Fat:</span> {food.fat.toFixed(2)}g</div>
                <div><span className="details">Fiber:</span> {food.fiber.toFixed(2)}g</div>
            </div>
        </div>
    )
}
NuReportItem.propTypes = {
    food: PropTypes.object.isRequired,
};
export default NuReportItem;