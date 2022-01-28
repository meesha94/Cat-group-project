import './App.css';
import './index.css';
import BasketPanel from './Components/basket';
import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';


const App = () => {
  const [cat, setCat] = useState({})
  // For the Basket
  const [basket, setBasket] = useState(0);

  // ADD to the Basket
  const addBasket = (e) => {
    e.preventDefault();
    setBasket(basket + 1)
    if (basket === 10) {
      setBasket(10)
    }
  };

  // REMOVE from the Basket
  const removeBasket = (e) => {
    e.preventDefault();
    setBasket(basket - 1)
    if (basket === 0) {
      setBasket(0)
    }
  };


  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    const data = await response.json()
    console.log(data)

    setCat(data)

  };


  return (
    <div>
      <BasketPanel />
      <h1>The Cat Shop </h1>
      <div className="grid">
        {cat.length > 0 && cat.map((item, index) => {
          return (
            <div className="item">
              <p >{item.text}</p>
              <img src={item.url} alt="cat" />
              <p>{faker.name.findName()}</p>
              <p>£ {faker.datatype.number({
                min: 300,
                max: 700
              })}</p>
              <div className ="info">
              <p>Please contact {faker.name.firstName()} by phone on {faker.phone.phoneNumber()} </p>
              <p>or by email at {faker.internet.email()} for more information. </p>
              </div>
              <br />
              <button onClickCapture={addBasket}>ADD</button>
              <button onClick={removeBasket}>REMOVE</button>
            </div>

          )
        })}
      </div>

    </div>
  )
};

export default App;


