import React from "react";
import PropTypes from "prop-types";
import "../style/FoodCard.scss";

const FoodCard = (props) => {
    const {
        food,
        handleDelete
    } = props;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const handleDetail = (e) => {
        const parentDOM = e.target.parentNode.parentNode;
        if (parentDOM.style.overflow === "visible"){
            parentDOM.style.overflow = "hidden";
            parentDOM.style.height = "4.5em";
            e.target.innerText = "More Detail"
        } else {
            parentDOM.style.overflow = "visible";
            parentDOM.style.height = "10em";
            e.target.innerText = "Show Less"
        }
    }

    return (
        <div className="foodCard" data-id={food.id}>
            <div className="innerCard">
                <div>
                    <strong className="card-title">{capitalizeFirstLetter(food.name)}</strong>
                    <div className="deleteBtn" onClick={(e) => handleDelete(e)}>X</div>
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
FoodCard.propTypes = {
    food: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
};
export default FoodCard;