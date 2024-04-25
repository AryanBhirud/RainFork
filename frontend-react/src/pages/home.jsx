import React, { useEffect, useState } from "react";
import "./home.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home() {
  const [recommended, setRecommended] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/products/"
      );
      setProducts(data);
      setRecommended(data);
    };
    fetchData();

    const fetchCart = async () => {
      const instance = axios.create({
        baseURL: "https://example.com/api",
        withCredentials: true,
      });
      const { data } = await instance.get(
        "http://localhost:3001/api/v1/users/cart"
      );
      setCart(data.cart);
    };
    fetchCart();
  }, []);
  return (
    <div className="container">
      <div className="ad">
        <img src="images/4.avif" alt="Ad" />
      </div>
      {recommended.length != 0 ? (
        <>
          <h1>Spotlight</h1>
          <div className="spotlight">
            {recommended.map((card, index) => {
              return <Card card={card} key={index} cart={cart}/>;
            })}
          </div>
        </>
      ) : (
        ""
      )}
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((card, index) => {
          return <Card card={card} key={index} cart={cart}/>;
        })}
      </div>
    </div>
  );
}

const Card = ({ card, cart }) => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);
  const handleClick = async (id) => {
    if (cookies.token) {
      const response = await axios.get(
        `http://localhost:3001/api/v1/users/products/${id}`,
        { withCredentials: true }
      );
    }
    navigate(`/product/${card._id}`);
  };

  const addToCart = async (id) => {
    const instance = axios.create({
      baseURL: "https://example.com/api",
      withCredentials: true,
    });
    console.log(id)
    const _ = await instance.get(`http://localhost:3001/api/v1/users/cart/${id}`)
  }

  return (
    <div className="card" onClick={() => handleClick(card._id)}>
      <img
        src={card.baseImageUrl}
        alt={card.productName}
        width="150px"
        height="150px"
      />
      <p>{card.productName.split("").slice(0, 40).join("") + "..."}</p>
      <p>{card.description.split("").slice(0, 50).join("") + "..."}</p>
      <p>
        <b>Category:</b> {card.category}
      </p>
      <div>
        <p>{card.price}</p>
        {cart?.includes(card._id) ? (
          <button>Added to Cart</button>
        ) : (
          <button onClick={() => addToCart(card._id)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default Home;
