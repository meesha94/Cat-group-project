import './App.css';
import { useState, useEffect } from "react";



const App = () => {
  const [cat, setCat] = useState({})
 

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
      
      {cat.length > 0 && cat.map((item, index) => {
        return (
          <div>
            <p>{item.text}</p>
            <img src={item.url} alt="cat" />
          </div>
        )
      })}

    </div>
  )
};

export default App;

