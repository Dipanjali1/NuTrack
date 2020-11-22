import React from 'react';
import '../styles/FoodCard.scss';

const FoodCard = (props) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const handleDetail = (e) => {
        if (e.target.parentNode.parentNode.style.overflow === "visible"){
            e.target.parentNode.parentNode.style.overflow = "hidden";
            e.target.parentNode.parentNode.style.height = "4.5em";
            e.target.innerText = "More Detail"
        } else {
            e.target.parentNode.parentNode.style.overflow = "visible";
            e.target.parentNode.parentNode.style.height = "10em";
            e.target.innerText = "Show Less"
        }
    }

    return (
        <div className="foodCard" data-id={props.food.id}>
            <div className="innerCard">
                <div>
                    <strong>{capitalizeFirstLetter(props.food.name)}</strong>
                    <div className="line"></div>
                    <div className="deleteBtn" onClick={(e) => props.handleDelete(e)}>X</div>
                </div>
                <div><span className="details">Qty:</span> {props.food.quantity}</div>
                <div className="moreDetail" onClick={(e) => handleDetail(e)}>More Detail</div>
                <div><span className="details">Carbs:</span> {props.food.carbs.toFixed(2)}g</div>
                <div><span className="details">Protein: </span> {props.food.protein.toFixed(2)}g</div>
                <div><span className="details">Fat:</span> {props.food.fat.toFixed(2)}g</div>
                <div><span className="details">Fiber:</span> {props.food.fiber.toFixed(2)}g</div>
            </div>
        </div>
    )
}
export default FoodCard;