import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import Legend from "./Legend.js";
import FoodCard from "./FoodCard.js";
import "../styles/Nutrition.scss";
const API = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=";
const REPORTS = "http://localhost:3001/nutrition_reports/";

const Nutrition = (props) => {
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0.000045);
  const [protein, setProtein] = useState(0.00003);
  const [fat, setFats] = useState(0.00002);
  const [fiber, setFiber] = useState(0.000005);
  const [foodList, setFoodList] = useState([]);

  const [itemInput, setItemInput] = useState("");
  const [quantityInput, setQuantity] = useState(1);
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

  async function addItem(e) {
    e.preventDefault();
    let btn = document.querySelector('.add-item-btn');
    if (quantityInput <= 0)
      return setErrorMessage("Quantity has to be over 0.");
    if (isNaN(quantityInput))
      return setErrorMessage("Quantity has to be number.");
      btn.disabled = true;
    if (formChange) {
      handleManualSubmit();
      btn.disabled = false;
    } else {
      await fetch(`${API}${itemInput}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":"9c53497f87msh5a9410759cd8eafp149cecjsn0204a28c3b8c",
          "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
        },
      })
        .then((resp) => resp.json())
        .then((data) => handleSubmit(data.parsed[0].food))
        .catch((err) => {
          setErrorMessage("Item Not Found");
        });
      setItemInput('');
      setQuantity(1);
      setCaloriesInput('');
      setCarbsInput('');
      setProteinInput('');
      setFatInput('');
      setFiberInput('');
      btn.disabled = false;
    }
  }

  function handleSubmit(food) {
    if (!food.nutrients.FIBTG) {
      setFiber(fiber + 0);
      setCalories(calories + food.nutrients.ENERC_KCAL * quantityInput);
      setCarbs(carbs + food.nutrients.CHOCDF * quantityInput);
      setProtein(protein + food.nutrients.PROCNT * quantityInput);
      setFats(fat + food.nutrients.FAT * quantityInput);
      setFoodList((oldArr) => [
        ...oldArr,
        {
          id: food.foodId + Math.random(),
          name: food.label,
          calories: food.nutrients.ENERC_KCAL * quantityInput,
          quantity: quantityInput,
          carbs: food.nutrients.CHOCDF * quantityInput,
          protein: food.nutrients.PROCNT * quantityInput,
          fat: food.nutrients.FAT * quantityInput,
          fiber: 0,
          img: food.image,
        },
      ]);
    } else {
      setFiber(fiber + food.nutrients.FIBTG * quantityInput);
      setCalories(calories + food.nutrients.ENERC_KCAL * quantityInput);
      setCarbs(carbs + food.nutrients.CHOCDF * quantityInput);
      setProtein(protein + food.nutrients.PROCNT * quantityInput);
      setFats(fat + food.nutrients.FAT * quantityInput);
      setFoodList((oldArr) => [
        ...oldArr,
        {
          id: food.foodId + Math.random(),
          name: food.label,
          calories: food.nutrients.ENERC_KCAL * quantityInput,
          quantity: quantityInput,
          carbs: food.nutrients.CHOCDF * quantityInput,
          protein: food.nutrients.PROCNT * quantityInput,
          fat: food.nutrients.FAT * quantityInput,
          fiber: food.nutrients.FIBTG * quantityInput,
          img: food.image,
        },
      ]);
    }
    setErrorMessage('');
  }

  function handleManualSubmit() {
    if(itemInput === '') return setErrorMessage("Item name cannot be an empty.")
    if(quantityInput < 1 || quantityInput === '') return setErrorMessage("Quantity cannot be zero, negative number, empty.");
    if (caloriesInput < 0 || caloriesInput === '')
      return setErrorMessage("Calories cannot be negative number or empty.");
    if (isNaN(caloriesInput))
      return setErrorMessage("Calories has to be number.");
    if (carbsInput < 0 || carbsInput === '')
      return setErrorMessage("Carbs cannot be negative number or empty.");
    if (isNaN(carbsInput)) return setErrorMessage("Carbs has to be number.");
    if (proteinInput < 0 || proteinInput === '')
      return setErrorMessage("Protein cannot be negative number or empty.");
    if (isNaN(proteinInput))
      return setErrorMessage("Protein has to be number.");
    if (fatInput < 0 || fatInput === '') return setErrorMessage("Fat cannot be negative number or empty.");
    if (isNaN(fatInput)) return setErrorMessage("Fat has to be number.");
    if (fiberInput < 0 || fiberInput === '')
      return setErrorMessage("Fiber cannot be negative number or empty.");
    if (isNaN(fiberInput)) return setErrorMessage("Fiber has to be number.");
    setCalories(calories + caloriesInput * quantityInput);
    setCarbs(carbs + carbsInput * quantityInput);
    setProtein(protein + proteinInput * quantityInput);
    setFats(fat + fatInput * quantityInput);
    setFiber(fiber + fiberInput * quantityInput);
    setFoodList((oldArr) => [
      ...oldArr,
      {
        id: Math.random() + itemInput + caloriesInput,
        name: itemInput,
        calories: caloriesInput * quantityInput,
        quantity: quantityInput,
        carbs: carbsInput * quantityInput,
        protein: proteinInput * quantityInput,
        fat: fatInput * quantityInput,
        fiber: fiberInput * quantityInput,
        img: null,
      },
    ]);
    setItemInput('');
    setQuantity(1);
    setCaloriesInput('');
    setCarbsInput('');
    setProteinInput('');
    setFatInput('');
    setFiberInput('');
    setErrorMessage('');
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

  function handleFormChange(e) {
    if (!formChange) {
      setFormChange(true);
      document.querySelector(".manualFromOpenBtn").innerText = "Find Item";
    } else {
      setFormChange(false);
      document.querySelector(".manualFromOpenBtn").innerText = "ADD Item Manually";
    }
  }

  async function handleSaveReport(e) {
    e.preventDefault();
    let btn = document.querySelector('.report-save-btn');
    let date = new Date(intakeDateInput);
    if (reportTitleInput.length < 1) return setErrorMessage("Report Title cannot be blank.");
    if (isNaN(date.getTime())) return setErrorMessage("Invalid Date Input. ReEnter the Date input with YYYY-MM-DD format with hyphen.");
    if (!foodList.length) return setErrorMessage("Item is empty! Nothing to Save.");
    btn.disabled = true;
    let reqObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: props.user.user.id,
        reportName: reportTitleInput,
        intakeDate: date,
        intakes: foodList,
      }),
    };
    await fetch(REPORTS, reqObj)
      .then((resp) => resp.json())
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
        handleLegendSeverity();
        btn.disabled = false;
        console.log(data);
      });
  }

  function openReportSaveForm(e) {
    e.preventDefault();
    if (!localStorage.getItem("user")) return setErrorMessage("Please Sign-in");
    if (!isReportFormOpen && localStorage.getItem("user")) {
      setIsReportFormOpen(true);
    } else {
      setIsReportFormOpen(false);
    }
  }

  // // It renders saved nutrition reports specifically for the user who signed in
  // async function testRenderNutritionReport(e){
  //   e.preventDefault();
  //   let reqObj = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("user")}`,
  //       "Content-Type": "application/json",
  //     }
  //   }
  //   await fetch(REPORTS, reqObj)
  //   .then(resp => resp.json())
  //   .then(data => console.log(data));
  // }

  return (
    <div className="whole-container">
      {/* <button onClick={(e) => testRenderNutritionReport(e)}>TEST ME</button> */}
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
        <div className="calories">{calories}<br />Kcal</div>
      </div>
      <Legend
        carbs={carbs.toFixed(2)}
        protein={protein.toFixed(2)}
        fat={fat.toFixed(2)}
        fiber={fiber.toFixed(2)}
      />

      <div className="errorMessage">{errorMessage}</div>

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
              <input className="userInput" type="text" placeholder="Quantity" value={quantityInput} onChange={(e) => setQuantity(e.target.value)} />
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
              <input className="userInput" type="text" placeholder="Quantity" value={quantityInput} onChange={(e) => setQuantity(e.target.value)} />
            </label>
          </div>
        )}
        <button className="red submitBtn add-item-btn" type="submit">
          ADD
        </button>
        <div className="manualFromOpenBtn" onClick={(e) => handleFormChange(e)}>
          ADD Item Manually?
        </div>
      </form>

      <div className="foodCardsCont">{handleFoodCards()}</div>

      <div className="report-save-form">
        {isReportFormOpen ?
          <div>
            <div className="manualFromOpenBtn" onClick={(e) => openReportSaveForm(e)}>
              Want to close a form?
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
        :
          <div className="manualFromOpenBtn" onClick={(e) => openReportSaveForm(e)}>
            Want to save a report?
          </div>
        }
      </div>
      
    </div>
  );
};
export default Nutrition;
