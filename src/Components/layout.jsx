import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import BasketPanel from "./basket";

const Layout = () => {
    const [cat, setCat] = useState([])
    const[list, setList] = useState([])

    const onAdd = (item) => {
        let tempArr = [...list]
        tempArr.push(item)
        setList(tempArr)
        console.log(list)
    }
    const onRemove = (item) => {
        let tempArr = [...list]
    }

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
            <BasketPanel list={list}/>
            <div className="grid">
                {cat.map((item) => {

                    return (
                        <div className="item">
                            
                            <img src={item.url} alt="cat" />
                            <p>{item.title}</p>
                            <p>£ {item.price}</p>
                            <div className="info">
                                <p>Please contact {item.seller} by phone on {item.number} </p>
                                <p>or by email at {item.email} for more information. </p>
                            </div>
                            
                            <br />
                            <button onClick={() => onAdd(item)}>Add</button>
                            <button onClick={() => onRemove(item)}>Remove</button>

                            <br/>
                            

                        </div>


                        

                        

                    )
                })}
            </div>

        </div>
    )
};


export default Layout;
