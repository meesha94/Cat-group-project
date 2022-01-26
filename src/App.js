import './index.css';
import { useState, useEffect } from "react";

const App = () => {
  const [cat, setCat] = useState({})
  // For the Basket
  const [basket, setBasket] = useState(0);
 

  // ADD to the Basket
  const addBasket = () => {
    setBasket(basket + 1)
    if (basket == 5 ) {
      setBasket(5)
    }
  };

  // REMOVE from the Basket
  const removeBasket = () => {
    setBasket(basket - 1)
    if (basket == 0 ) {
        setBasket(0)
    }
  };


  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=5")
    const data = await response.json()
    console.log(data)

    setCat(data)
  };

  return (
    <div>
      <h1>The Cat Shop </h1>
      <h1>In the Basket: {basket}</h1>
      
      {cat.length > 0 && cat.map((item, index) => {
        return (
          <div>
            <p>{item.text}</p>
            <img src={item.url} alt="cat" />
            <br />
            <button onClickCapture={addBasket}>ADD</button>
            <button onClick={removeBasket}>REMOVE</button>
          </div>
        )
      })}


    </div>
  )
};

export default App;

