import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import API from '../services/Api.js';
import Legend from "./Legend.js";
import FoodCard from "./FoodCard.js";
import "../styles/Nutrition.scss";

const Nutrition = (props) => {
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0.000045);
  const [protein, setProtein] = useState(0.00003);
  const [fat, setFats] = useState(0.00002);
  const [fiber, setFiber] = useState(0.000005);
  const [foodList, setFoodList] = useState([]);

  const [itemInput, setItemInput] = useState("");
  const [quantityInput, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formChange, setFormChange] = useState(false);

  const [caloriesInput, setCaloriesInput] = useState("");
  const [carbsInput, setCarbsInput] = useState("");
  const [proteinInput, setProteinInput] = useState("");
  const [fatInput, setFatInput] = useState("");
  const [fiberInput, setFiberInput] = useState("");

  const [reportTitleInput, setReportTitleInput] = useState("");
  const [intakeDateInput, setIntakeDateInput] = useState("");

  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  const chartData = [
    { title: "Carbs", value: carbs, color: "#E96255" },
    { title: "Protein", value: protein, color: "#EFC319" },
    { title: "Fat", value: fat, color: "#96C93D" },
    { title: "Fiber", value: fiber, color: "#58A5BD" },
  ];

  useEffect(() => {
    const checkBox = document.querySelector(".checkBox");
    if (checkBox.checked) {
      checkBox.checked = false;
    }
    if (!props.user) {
      props.getUserInfo();
    }
  });

  function addItem(e) {
    e.preventDefault();
    let btn = document.querySelector('.add-item-btn');
    if (quantityInput <= 0) return setErrorMessage("Quantity has to be over 0.");
    if (isNaN(quantityInput)) return setErrorMessage("Quantity has to be number.");
    btn.disabled = true;
    props.setLoading(true);
    if (formChange) {
      handleManualSubmit();
      props.setLoading(false);
      btn.disabled = false;
    } else {
        API.getItem(itemInput)
        .then((data) => handleSubmit(data.parsed[0].food))
        .catch((err) => {
          console.log(err.message);
          props.setLoading(false);
          setErrorMessage("Item Not Found");
        });
      resetInput();
      btn.disabled = false;
    }
  }

  function handleSubmit(food) {
    setCalories(calories + (food.nutrients.ENERC_KCAL).toFixed(0) * quantityInput);
    setCarbs(carbs + (food.nutrients.CHOCDF).toFixed(2) * quantityInput);
    setProtein(protein + (food.nutrients.PROCNT).toFixed(2) * quantityInput);
    setFats(fat + (food.nutrients.FAT).toFixed(2) * quantityInput);
    if (!food.nutrients.FIBTG) {
      setFiber(fiber + 0);
      setFoodList((oldArr) => [
        ...oldArr,
        {
          id: food.foodId + Math.random(),
          name: food.label,
          calories: (food.nutrients.ENERC_KCAL).toFixed(0) * quantityInput,
          quantity: quantityInput,
          carbs: (food.nutrients.CHOCDF).toFixed(2) * quantityInput,
          protein: (food.nutrients.PROCNT).toFixed(2) * quantityInput,
          fat: (food.nutrients.FAT).toFixed(2) * quantityInput,
          fiber: 0,
          img: food.image,
        },
      ]);
    } else {
      setFiber(fiber + (food.nutrients.FIBTG).toFixed(2) * quantityInput);
      setFoodList((oldArr) => [
        ...oldArr,
        {
          id: food.foodId + Math.random(),
          name: food.label,
          calories: (food.nutrients.ENERC_KCAL).toFixed(0) * quantityInput,
          quantity: quantityInput,
          carbs: (food.nutrients.CHOCDF).toFixed(2) * quantityInput,
          protein: (food.nutrients.PROCNT).toFixed(2) * quantityInput,
          fat: (food.nutrients.FAT).toFixed(2) * quantityInput,
          fiber: (food.nutrients.FIBTG).toFixed(2) * quantityInput,
          img: food.image,
        },
      ]);
    }
    props.setLoading(false);  
    setErrorMessage('');
  }

  function handleInputCheck(){
    if (itemInput === '') return setErrorMessage("Item name cannot be an empty.")
    if (quantityInput < 1 || quantityInput === '') return setErrorMessage("Quantity cannot be zero, negative number, empty.");
    if (caloriesInput < 0 || caloriesInput === '') return setErrorMessage("Calories cannot be negative number or empty.");
    if (isNaN(caloriesInput)) return setErrorMessage("Calories has to be number.");
    if (carbsInput < 0 || carbsInput === '') return setErrorMessage("Carbs cannot be negative number or empty.");
    if (isNaN(carbsInput)) return setErrorMessage("Carbs has to be number.");
    if (proteinInput < 0 || proteinInput === '') return setErrorMessage("Protein cannot be negative number or empty.");
    if (isNaN(proteinInput)) return setErrorMessage("Protein has to be number.");
    if (fatInput < 0 || fatInput === '') return setErrorMessage("Fat cannot be negative number or empty.");
    if (isNaN(fatInput)) return setErrorMessage("Fat has to be number.");
    if (fiberInput < 0 || fiberInput === '') return setErrorMessage("Fiber cannot be negative number or empty.");
    if (isNaN(fiberInput)) return setErrorMessage("Fiber has to be number.");
    return true;
  }

  function resetInput(){
    setItemInput('');
    setQuantity('');
    setCaloriesInput('');
    setCarbsInput('');
    setProteinInput('');
    setFatInput('');
    setFiberInput('');
    setErrorMessage('');
  }

  function handleManualSubmit() {
    if(!handleInputCheck()) return;
    setCalories(calories + parseFloat(caloriesInput).toFixed(0) * quantityInput);
    setCarbs(carbs + parseFloat(carbsInput).toFixed(2) * quantityInput);
    setProtein(protein + parseFloat(proteinInput).toFixed(2) * quantityInput);
    setFats(fat + parseFloat(fatInput).toFixed(2) * quantityInput);
    setFiber(fiber + parseFloat(fiberInput).toFixed(2) * quantityInput);
    setFoodList((oldArr) => [
      ...oldArr,
      {
        id: Math.random() + itemInput + caloriesInput,
        name: itemInput,
        calories: parseFloat(caloriesInput).toFixed(0) * quantityInput,
        quantity: quantityInput,
        carbs: parseFloat(carbsInput).toFixed(2) * quantityInput,
        protein: parseFloat(proteinInput).toFixed(2) * quantityInput,
        fat: parseFloat(fatInput).toFixed(2) * quantityInput,
        fiber: parseFloat(fiberInput).toFixed(2) * quantityInput,
        img: null,
      },
    ]);
    resetInput();
  }

  function handleFoodCards() {
    return foodList.map((food) => {
      return (
        <FoodCard food={food} key={food.id + Math.random()} handleDelete={handleDelete} />
      );
    });
  }

  function handleLegendSeverity() {
    document.querySelector(".carbIntake").style.color = "black";
    document.querySelector(".carbIntake").innerText = "";
    document.querySelector(".proteinIntake").style.color = "black";
    document.querySelector(".proteinIntake").innerText = "";
    document.querySelector(".fatIntake").style.color = "black";
    document.querySelector(".fatIntake").innerText = "";
    document.querySelector(".fiberIntake").style.color = "black";
    document.querySelector(".fiberIntake").innerText = "";
  }

  function handleDelete(e) {
    let id = e.target.parentNode.parentNode.parentNode.dataset.id;
    let found = foodList.find((food) => food.id === id);
    handleLegendSeverity();
    calories - found.calories < 0 ? setCalories(0) : setCalories(calories - found.calories);
    carbs - found.carbs < 0 ? setCarbs(0) : setCarbs(carbs - found.carbs);
    protein - found.protein < 0 ? setProtein(0) : setProtein(protein - found.protein);
    fat - found.fat < 0 ? setFats(0) : setFats(fat - found.fat);
    fiber - found.fiber < 0 ? setFiber(0) : setFiber(fiber - found.fiber);
    setFoodList(foodList.filter((food) => food.id !== id));
  }

  function handleManualForm(e) {
    setIsReportFormOpen(false);
    setFormChange(true);
    setErrorMessage('');
  }

  function handleFindItemForm(e){
    setIsReportFormOpen(false);
    setFormChange(false);
    setErrorMessage('');
  }

  function handleSaveReport(e) {
    e.preventDefault();
    let btn = document.querySelector('.report-save-btn');
    let date = new Date(intakeDateInput);
    if (reportTitleInput.length < 1) return setErrorMessage("Report Title cannot be blank.");
    if (isNaN(date.getTime())) return setErrorMessage("Invalid Date Input. ReEnter the Date input with YYYY-MM-DD format with hyphen.");
    if (!foodList.length) return setErrorMessage("Item is empty! Nothing to Save.");
    btn.disabled = true;
    props.setLoading(true);
    API.saveReport(localStorage.getItem('user'), props.user.user.id, reportTitleInput, date, foodList)
      .catch(err => console.log(err))
      .then((data) => {
        setReportTitleInput('');
        setIntakeDateInput('');
        setErrorMessage('');
        setFoodList([]);
        setCalories(0);
        setCarbs(0.000045);
        setProtein(0.00003);
        setFats(0.00002);
        setFiber(0.000005);
        props.setLoading(false);
        handleLegendSeverity();
        btn.disabled = false;
        alert('Successfully Saved');
      });
  }

  function openReportSaveForm(e) {
    e.preventDefault();
    if (!localStorage.getItem("user")) return setErrorMessage("Please Sign-in");
    if (!isReportFormOpen && localStorage.getItem("user")) {
      setIsReportFormOpen(true);
      setErrorMessage('');
    }
  }

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
    <div>
      {props.loading ?
      <div className="lds-facebook"><div></div><div></div><div></div></div>
      :
      <div className="whole-container">
        <div className="nutrition-menu">
            <div className="addItemManually manualFormOpenBtn" onClick={(e) => handleFindItemForm(e)}>
                Find Item
            </div>
            <div className="addItemManually manualFormOpenBtn" onClick={(e) => handleManualForm(e)}>
                Add Item Manually
            </div>
            <div className="saveReportFormBTN" onClick={(e) => openReportSaveForm(e)}>
                Save Nutrition Report
            </div>
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
          <div className="calories">{calories.toFixed(0)}<br />Kcal</div>
        </div>
        <Legend
          carbs={carbs.toFixed(2)}
          protein={protein.toFixed(2)}
          fat={fat.toFixed(2)}
          fiber={fiber.toFixed(2)}
        />
        <div className="errorMessage">{errorMessage}</div>
        {isReportFormOpen ?
        <div className="report-save-form">
          <div>
            <div className="segment divInForm">
              <h1>Save Report</h1>
            </div>
            <form className="addItemForm report-save-form-inner" onSubmit={(e) => handleSaveReport(e)}>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Report Title" value={reportTitleInput} onChange={(e) => setReportTitleInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Intake Date (YYYY-MM-DD)" value={intakeDateInput} onChange={(e) => setIntakeDateInput(e.target.value)} />
              </label>
              <button className="red submitBtn report-save-btn" type="submit">
                Save Report
              </button>
            </form>
          </div>
        </div>
        :
        <form className="addItemForm" onSubmit={(e) => addItem(e)}>
          <div className="segment divInForm">
            <h1>Add Item</h1>
          </div>
          {formChange ? (
            <div>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Item Name"  value={itemInput}  onChange={(e) => setItemInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Quantity (1 serving = 100g)" value={quantityInput} onChange={(e) => setQuantity(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Calories" value={caloriesInput} onChange={(e) => setCaloriesInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Carbs" value={carbsInput} onChange={(e) => setCarbsInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Protein" value={proteinInput} onChange={(e) => setProteinInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Fat" value={fatInput} onChange={(e) => setFatInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Fiber" value={fiberInput} onChange={(e) => setFiberInput(e.target.value)} />
              </label>
            </div>
          ) : (
            <div>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Item Name" value={itemInput} onChange={(e) => setItemInput(e.target.value)} />
              </label>
              <label className="inputLabel">
                <input className="userInput" type="text" placeholder="Quantity (1 serving = 100g)" value={quantityInput} onChange={(e) => setQuantity(e.target.value)} />
              </label>
            </div>
          )}
          <button className="red submitBtn add-item-btn" type="submit">
            ADD
          </button>
        </form>}
        <div className="foodCardsCont">{handleFoodCards()}</div>
        <div className="calorie-burn-wrapper">
          <div className="inner-calorie-burn-wrapper">
            <div className="exercise-title">Equivalent to:</div>
            <div>
              <div className="exercise-name">Walking </div><span className="calpermin">{timeConverter((calories / 7.6).toFixed(1))}</span><br/>
              <div className="exercise-name">Running </div> <span className="calpermin">{timeConverter((calories / 13.2).toFixed(1))}</span><br/>
              <div className="exercise-name">Push Ups </div> <span className="calpermin">{timeConverter((calories / 7).toFixed(1))}</span><br/>
              <div className="exercise-name">Sit Ups </div> <span className="calpermin">{timeConverter((calories / 9).toFixed(1))}</span><br/>
              <div className="exercise-name">Plank </div> <span className="calpermin">{timeConverter((calories / 5).toFixed(1))}</span><br/>
              <div className="exercise-name">Bicycle Crunch </div> <span className="calpermin">{timeConverter((calories / 3).toFixed(1))}</span><br/>
              <div className="exercise-name">Burpees </div><span className="calpermin">{timeConverter((calories / 9.4).toFixed(1))}</span><br/>
              <div className="exercise-name">Squat </div><span className="calpermin">{timeConverter((calories / 8).toFixed(1))}</span><br/>
              <div className="exercise-name">Lunges </div><span className="calpermin">{timeConverter((calories / 9.33).toFixed(1))}</span><br/>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default Nutrition;
