import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Legend from './Legend.js';
import FoodCard from './FoodCard.js';
import '../styles/Nutrition.scss';
const API = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=';

const Nutrition = () => {

    const [ calories, setCalories ] = useState(0);
    const [ carbs, setCarbs ] = useState(0.000045);
    const [ protein, setProtein ] = useState(0.000030);
    const [ fat, setFats ] = useState(0.000020);
    const [ fiber, setFiber ] = useState(0.000005);
    const [ foodList, setFoodList ] = useState([]);
  
    const [ itemInput, setItemInput ] = useState('');
    const [ quantityInput, setQuantity ] = useState(1);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ formChange, setFormChange ] = useState(false);

    const [ caloriesInput, setCaloriesInput ] = useState('');
    const [ carbsInput, setCarbsInput ] = useState('');
    const [ proteinInput, setProteinInput ] = useState('');
    const [ fatInput, setFatInput ] = useState('');
    const [ fiberInput, setFiberInput ] = useState('');

    const chartData = [
        { title: 'Carbs', value: carbs, color: '#E96255' },
        { title: 'Protein', value: protein, color: '#EFC319' },
        { title: 'Fat', value: fat, color: '#96C93D' },
        { title: 'Fiber', value: fiber, color: '#58A5BD' }
    ]
  
    async function addItem(e){
      e.preventDefault();
      if(quantityInput <= 0) return setErrorMessage('Quantity has to be over 0.');
      if(isNaN(quantityInput)) return setErrorMessage('Quantity has to be number.');
      if(formChange){
        handleManualSubmit();
      } else {
        await fetch(`${API}${itemInput}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "9c53497f87msh5a9410759cd8eafp149cecjsn0204a28c3b8c",
                    "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
                }
            })
            .then(resp => resp.json())
            .then(data => handleSubmit(data.parsed[0].food))
            .catch(err => {
                setErrorMessage('Item Not Found');
            });
            setItemInput('');
            setQuantity(1);
            setCaloriesInput('');
            setCarbsInput('');
            setProteinInput('');
            setFatInput('');
            setFiberInput('');
        }
    }
  
    function handleFoodNameInput(e){
      e.preventDefault();
      setItemInput(e.target.value);
    }
  
    function handleQuantityInput(e){
      e.preventDefault();
      setQuantity(e.target.value);
    }

    function handleCaloriesInput(e){
      e.preventDefault();
      setCaloriesInput(e.target.value);
    }

    function handleCarbsInput(e){
      e.preventDefault();
      setCarbsInput(e.target.value);
    }

    function handleProteinInput(e){
      e.preventDefault();
      setProteinInput(e.target.value);
    }

    function handleFatInput(e){
      e.preventDefault();
      setFatInput(e.target.value);
    }

    function handleFiberInput(e){
      e.preventDefault();
      setFiberInput(e.target.value);
    }
  
    function handleSubmit(food){
      setErrorMessage('');
      setCalories(calories+(food.nutrients.ENERC_KCAL*quantityInput));
      setCarbs(carbs+(food.nutrients.CHOCDF*quantityInput));
      setProtein(protein+(food.nutrients.PROCNT*quantityInput));
      setFats(fat+(food.nutrients.FAT*quantityInput));
      setFiber(fiber+(food.nutrients.FIBTG*quantityInput));
      setFoodList(oldArr => [...oldArr, {
        id: food.foodId+Math.random(),
        name: food.label,
        calories: food.nutrients.ENERC_KCAL*quantityInput,
        quantity: quantityInput,
        carbs: food.nutrients.CHOCDF*quantityInput,
        protein: food.nutrients.PROCNT*quantityInput,
        fat: food.nutrients.FAT*quantityInput,
        fiber: food.nutrients.FIBTG*quantityInput,
        img: food.image
      }]);
    }

    function handleManualSubmit(){
      if(caloriesInput < 0) return setErrorMessage('Calories cannot be negative number.');
      if(isNaN(caloriesInput)) return setErrorMessage('Calories has to be number.');
      if(carbsInput < 0) return setErrorMessage('Carbs cannot be negative number.');
      if(isNaN(carbsInput)) return setErrorMessage('Carbs has to be number.');
      if(proteinInput < 0) return setErrorMessage('Protein cannot be negative number.');
      if(isNaN(proteinInput)) return setErrorMessage('Protein has to be number.');
      if(fatInput < 0) return setErrorMessage('Fat cannot be negative number.');
      if(isNaN(fatInput)) return setErrorMessage('Fat has to be number.');
      if(fiberInput < 0) return setErrorMessage('Fiber cannot be negative number.');
      if(isNaN(fiberInput)) return setErrorMessage('Fiber has to be number.');
      setCalories(calories+(caloriesInput*quantityInput));
      setCarbs(carbs+(carbsInput*quantityInput));
      setProtein(protein+(proteinInput*quantityInput));
      setFats(fat+(fatInput*quantityInput));
      setFiber(fiber+(fiberInput*quantityInput));
      setFoodList(oldArr => [...oldArr, {
        id: Math.random()+itemInput+caloriesInput,
        name: itemInput,
        calories: caloriesInput*quantityInput,
        quantity: quantityInput,
        carbs: carbsInput*quantityInput,
        protein: proteinInput*quantityInput,
        fat: fatInput*quantityInput,
        fiber: fiberInput*quantityInput,
        img: null
      }]);
    }
  
    function handleFoodCards(){
      return foodList.map(food => {
        return <FoodCard food={food} key={food.id+Math.random()} handleDelete={handleDelete}/>
      })
    }

    function handleLegendSeverity(){
      document.querySelector('.carbIntake').style.color = 'black';
      document.querySelector('.carbIntake').innerText = '';
      document.querySelector('.proteinIntake').style.color = 'black';
      document.querySelector('.proteinIntake').innerText = '';
      document.querySelector('.fatIntake').style.color = 'black';
      document.querySelector('.fatIntake').innerText = '';
      document.querySelector('.fiberIntake').style.color = 'black';
      document.querySelector('.fiberIntake').innerText = '';
    }
  
    function handleDelete(e){
      let id = e.target.parentNode.parentNode.parentNode.dataset.id;
      let found = foodList.find(food => food.id === id);
      handleLegendSeverity();
      setCalories(calories-found.calories);
      setCarbs(carbs-found.carbs);
      setProtein(protein-found.protein);
      setFats(fat-found.fat);
      setFiber(fiber-found.fiber);
      setFoodList(foodList.filter(food => food.id !== id));
    }

    function handleFormChange(e){
      if(!formChange){
        setFormChange(true);
        document.querySelector('.manualFromOpenBtn').innerText = 'Find Item';
      } else {
        setFormChange(false);
        document.querySelector('.manualFromOpenBtn').innerText = 'ADD Item Manually';
      }
    }

  return (
    <div className="whole-container">
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
                    label={({ dataEntry }) => `${dataEntry.title}: ${Math.round(dataEntry.percentage)}%`}
                    labelPosition={60}
                    labelStyle={{
                    fontSize: "5px",
                    fontColor: "FFFFA",
                    fontWeight: "800",
                    }}
                >
                </PieChart>
            </div>
            <div className="calories">{calories}<br/>Kcal</div>
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
            {
              formChange ?
              <div>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Item Name" value={itemInput} onChange={(e) => handleFoodNameInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Quantity" value={quantityInput} onChange={(e) => handleQuantityInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Calories" value={caloriesInput} onChange={(e) => handleCaloriesInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Carbs" value={carbsInput} onChange={(e) => handleCarbsInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Protein" value={proteinInput} onChange={(e) => handleProteinInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Fat" value={fatInput} onChange={(e) => handleFatInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Fiber" value={fiberInput} onChange={(e) => handleFiberInput(e)}/>
                </label>
              </div>
              :
              <div>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Item Name" value={itemInput} onChange={(e) => handleFoodNameInput(e)}/>
                </label>
                <label className="inputLabel">
                    <input className="userInput" type="text" placeholder="Quantity" value={quantityInput} onChange={(e) => handleQuantityInput(e)}/>
                </label>
              </div>
            }
            <button className="red submitBtn" type="submit">ADD</button>
            <div className="manualFromOpenBtn" onClick={(e) => handleFormChange(e)}>ADD Item Manually</div>
        </form>


        <div className="foodCardsCont">
            {handleFoodCards()}
        </div>
    </div>
  );
}
export default Nutrition;
