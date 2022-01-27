import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const BasketPanel = () => {
  const [open, setOpen] = useState(false);
  const [basketList, setBasketList] = useState([
    {
      id: 4,
      quantity: 1,
      price: 1.99,
      description: "A fury picture",
    },
    {
      id: 7,
      quantity: 3,
      price: 2.99,
      description: "A fury",
    },
    {
      id: 12,
      quantity: 2,
      price: 2.99,
      description: "furr",
    },
    {
      id: 9,
      quantity: 2,
      price: 4.99,
      description: "Cat thingy",
    },
  ]);

  useEffect(() => {
    updateTotal();
  }, [, basketList]);
  const [total, setTotal] = useState([0, 0]);

  const handleRemove = (item) => {
    console.log("r" + item);
    let temp_array = [...basketList];
    temp_array.splice(item, 1);
    setBasketList(temp_array);
  };

  const updateQuantity = (item, num) => {
    console.log(item);
    let temp_array = [...basketList];
    num === "+"
      ? (temp_array[item].quantity += 1)
      : num === "-"
      ? (temp_array[item].quantity -= 1)
      : (temp_array[item].quantity = num);
    setBasketList(temp_array);
    console.log(temp_array);
  };

  const updateTotal = () => {
    let currentTotal = 0;
    let currentQuantity = 0;
    basketList.forEach((e) => {
      currentTotal = currentTotal + e.price * e.quantity;
      currentQuantity = currentQuantity + e.quantity;
    });
    setTotal([currentTotal.toFixed(2), currentQuantity]);
  };

  return (
    <div>
      <Panel onClick={() => setOpen(!open)}>
        Basket -<span> £{total[0]} </span>
        <span>( {total[1]} )</span>
      </Panel>
      {open && (
        <Basket
          list={basketList}
          updateQuantity={updateQuantity}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

const Basket = (props) => {
  return (
    <Container>
      {props.list.map((item) => (
        <BasketItem
          key={props.list.indexOf(item)}
          id={props.list.indexOf(item)}
          quantity={item.quantity}
          price={item.price}
          description={item.description}
          updateQuantity={props.updateQuantity}
          handleRemove={props.handleRemove}
        />
      ))}
      <div>
        Total £<span>{props.total}</span>
      </div>
    </Container>
  );
};

const BasketItem = (props) => {
  const addQuantity = () => {
    props.updateQuantity(props.id, "+");
  };

  const minusQuantity = () => {
    props.updateQuantity(props.id, "-");
  };

  return (
    <div>
      <ItemImage />
      <button onClick={() => props.quantity > 0 && minusQuantity(props.id)}>
        -
      </button>
      {/* <span>{quantity}</span> */}
      <Quantity
        onChange={(e) => {
          props.updateQuantity(props.id, parseInt(e.target.value) || 0);
        }}
        value={props.quantity}
      />
      <button onClick={() => addQuantity(props.id)}>+</button>
      <div>{props.description}</div>
      <div>
        Price - £<span>{props.price}</span>
      </div>
      <button onClick={() => props.handleRemove(props.id)}>Remove</button>
    </div>
  );
};

const ItemImage = () => {
  return (
    <div>
      <img src="" alt="Cat Image" />
    </div>
  );
};

export default BasketPanel;

const Container = styled.div`
  background: lightgrey;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
`;

const Quantity = styled.input`
  width: 20px;
  text-align: center;
`;

const Panel = styled.div`
  background-color: black;
  color: white;
  font-weight: 600;
  width: 200px;
  text-align: center;
  cursor: pointer;
  padding: 0.5rem;
`;
