import React, { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: "https://example.com/api",
        withCredentials: true,
      });
      const { data } = await instance.get(
        `http://localhost:3001/api/v1/users/cart`
      );
      setCart(data?.cart);
      console.log(data?.cart);
    };
    fetchData();
  }, []);
  return (
    <div className="cart">
      <div className="cart-grid">
        {cart?.map((id, index) => (
          <Card id={id} key={index} />
        ))}
      </div>
      <button>Order</button>
    </div>
  );
}

const Card = ({ id }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/v1/products/${id}`
      );
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="cart-card" onClick={() => handleClick(card._id)}>
      <img
        src={data?.baseImageUrl}
        alt={data?.productName}
        width="150px"
        height="150px"
      />
      <p>{data?.productName.split("").slice(0, 40).join("") + "..."}</p>
      <p>{data?.description.split("").slice(0, 50).join("") + "..."}</p>
      <p>
        <b>Category:</b> {data?.category}
      </p>
      <p>{data?.price}</p>
    </div>
  );
};

export default Cart;
