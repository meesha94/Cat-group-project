import './index.css';
import { useState, useEffect } from "react";
import { name } from "faker";


const App = () => {
  const [cat, setCat] = useState({})
  // For the Basket
  const [basket, setBasket] = useState(0);

  // ADD to the Basket
  const addBasket = () => {
    setBasket(basket + 1)
    if (basket == 5) {
      setBasket(5)
    }
  };

  // REMOVE from the Basket
  const removeBasket = () => {
    setBasket(basket - 1)
    if (basket == 0) {
      setBasket(0)
    }
  };
  
  
  
  let firstName = name.firstName();
  
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
      <h1>The Cat Shop </h1>
      <h4>In the Basket: {basket}</h4>
      <div className="grid">
        {cat.length > 0 && cat.map((item, index) => {

          return (
            <div className="item">
              <p >{item.text}</p>
              <img src={item.url} alt="cat" />
              <p>{name.firstName()}</p>
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


