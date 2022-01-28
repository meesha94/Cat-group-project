import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const BasketPanel = () => {
  const [open, setOpen] = useState(false);
  const [basketList, setBasketList] = useState([
    {
      id: 4,
      quantity: 1,
      price: 1.99,
      title: "A fury picture",
      image: "https://i.ebayimg.com/images/g/KIYAAOSwVblcbUkB/s-l300.jpg",
    },
    {
      id: 7,
      quantity: 3,
      price: 2.99,
      title: "A fury",
      image: "https://i.ebayimg.com/images/g/KIYAAOSwVblcbUkB/s-l300.jpg",
    },
    {
      id: 12,
      quantity: 2,
      price: 2.99,
      title: "furr",
      image: "https://i.ebayimg.com/images/g/KIYAAOSwVblcbUkB/s-l300.jpg",
    },
    {
      id: 9,
      quantity: 2,
      price: 4.99,
      title: "Cat thingy",
      image: "https://m.media-amazon.com/images/I/71kNvlpS9GL._AC_SY355_.jpg",
    },
    {
      id: 7,
      quantity: 3,
      price: 2.99,
      title: "A fury",
      image: "https://i.ebayimg.com/images/g/KIYAAOSwVblcbUkB/s-l300.jpg",
    },
    {
      id: 12,
      quantity: 2,
      price: 2.99,
      title: "furr",
      image: "https://i.ebayimg.com/images/g/KIYAAOSwVblcbUkB/s-l300.jpg",
    },
    {
      id: 9,
      quantity: 2,
      price: 4.99,
      title: "Cat thingy",
      image: "https://m.media-amazon.com/images/I/71kNvlpS9GL._AC_SY355_.jpg",
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
    <Color>
      <Panel onClick={() => setOpen(!open)}>
        Basket -<span> £{total[0]} </span>
        <Num>{total[1]}</Num>
      </Panel>
      {open && (
        <Basket
          list={basketList}
          updateQuantity={updateQuantity}
          handleRemove={handleRemove}
          total={total}
        />
      )}
    </Color>
  );
};

const Basket = (props) => {
  return (
    <Container className="container">
      <Inner className="inner">
        {props.list.map((item) => (
          <BasketItem
            key={props.list.indexOf(item)}
            id={props.list.indexOf(item)}
            img={item.image}
            quantity={item.quantity}
            price={item.price}
            title={item.title}
            updateQuantity={props.updateQuantity}
            handleRemove={props.handleRemove}
          />
        ))}
      </Inner>
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
    <Spacer>
      <Center>{props.title}</Center>
      <CatImage src={props.img} alt="Cat Image" />
      <Center>
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
        <Center>
          Price - £<span>{props.price}</span>
        </Center>
        <button onClick={() => props.handleRemove(props.id)}>Remove</button>
      </Center>
    </Spacer>
  );
};

export default BasketPanel;

const Container = styled.div`
 position: fixed;
 right: 15px;
 top: 53px;
  box-sizing: content-box;
  background: #E8E7E7;
  overflow: hidden;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  border: 1px solid #3B3A3A;
  max-height: 100vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0 0 2rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const Quantity = styled.input`
  width: 20px;
  text-align: center;
`;

const Panel = styled.div`
  position: fixed;
  font-size: 1.2em;
  right: 0px;
  top: 0px;
  color: white;
  font-weight: 600;
  width: 285px;
  text-align: center;
  cursor: pointer;
  padding: 0.8rem 0rem;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  border: 1px solid #3B3A3A;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const CatImage = styled.img`
  width: 180px;
  border: 1px solid #3B3A3A;
  border-radius: 10px;
  pointer: cursor;
`;

const Spacer = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.25rem 2rem 0.3rem 0;
  border-bottom: 1px solid #3B3A3A;
`;

const Center = styled.div`
  margin: 0.4rem;
  text-align: center;
  font-weight: 600;
  button {
    cursor: pointer;
  }
`;

const Color = styled.div`
  max-width: 250px;
`;

const Num = styled.span`
  background-color:white;
  color: #3B3A3A;
  border-radius: 50px;
  padding: 0 0.4rem;
  margin-left: 0.5rem;
  border: 1px solid #3B3A3A;
  font-size: 0.8em;
  font-weight: 600;
`;

const Inner = styled.div`
  overflow: overlay;
  overflow-x: hidden;
  padding-bottom: 3rem;
`;
