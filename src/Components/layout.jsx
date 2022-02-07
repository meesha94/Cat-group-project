import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import BasketPanel from "./basket";

const Layout = () => {
    const [cat, setCat] = useState([])
    const[list, setList] = useState([])
    const[total, setTotal] = useState([0,0])

    const onAdd = (item) => {
        let tempArr = [...list]
        tempArr.push(item)
        setList(tempArr)
        console.log(list)
    }

  useEffect(() => {
    updateTotal();
  }, [, list]);

  const handleRemove = (item) => {
    console.log("r" + item);
    let temp_array = [...list];
    temp_array.splice(item, 1);
    setList(temp_array);
  };

  const updateQuantity = (item, num) => {
    console.log(item);
    let temp_array = [...list];
    num === "+"
      ? (temp_array[item].quantity += 1)
      : num === "-"
      ? (temp_array[item].quantity -= 1)
      : (temp_array[item].quantity = num);
    setList(temp_array);
    console.log(temp_array);
  };

  const updateTotal = () => {
    let currentTotal = 0;
    let currentQuantity = 0;
    list.forEach((e) => {
      currentTotal = currentTotal + e.price * e.quantity;
      currentQuantity = currentQuantity + e.quantity;
    });
    setTotal([currentTotal.toFixed(2), currentQuantity]);
  };

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        const data = await response.json()
        handleData(data)

    };

    const handleData = (data) => {
        let tempArr = []
        
        data.forEach(e => {
            
        let item = {
            title: faker.name.findName(),
            price:faker.datatype.number({
                min: 300,
                max: 700
            }),
            seller:faker.name.firstName(),
            phone:faker.phone.phoneNumber(),
            email:faker.internet.email(),


        }
        
        const completeItem = {
            ...item,
            ...e,
            quantity:1
        }
        tempArr.push(completeItem)
    }
    )
    setCat(tempArr)
    

    }


    return (
        <div>

            <h1>The Cat Shop </h1>
            <BasketPanel list={list} add={updateQuantity} remove={handleRemove} total={total}/>
            <div className="grid">
                {cat.map((item) => {

                    return (
                        <div className="item">
                            
                            <img className="catPic" src={item.url} alt="cat" />
                            <p>{item.title}</p>
                            <p>£ {item.price}</p>
                            <div className="info">
                                <p>Please contact {item.seller} by phone on {item.number} </p>
                                <p>or by email at {item.email} for more information. </p>
                            </div>
                            
                            <br />
                            <button className="button" onClick={() => onAdd(item)}>Add</button>
                            <br/>
                            

                        </div>


                        

                        

                    )
                })}
            </div>

        </div>
    )
};


export default Layout;
