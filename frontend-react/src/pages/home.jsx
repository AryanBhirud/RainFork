import React, { useEffect, useState } from 'react';
import './home.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Home() {
  const [recommended, setRecommended] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("http://localhost:3001/api/v1/products/");
      setProducts(data);
      setRecommended(data);
    }

    fetchData();
  }, [])
  return (
    <div className="container">
      <div className="ad">
        <img src="images/4.avif" alt="Ad" />
      </div>
      {recommended.length != 0 ? (<><h1>Spotlight</h1><div className="spotlight">
        {recommended.map((card, index) => {
          return <Card card={card} key={index}/>
        })}
      </div></>) : ""}
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((card, index) => {
          return <Card card={card} key={index}/>
        })}
      </div>
    </div>
  );
}

const Card = ({card}) => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);
  const handleClick = async () => {
    if (cookies.token) {
      const response = await axios.get(`http://localhost:3001/api/v1/users/products/${card._id}`,{withCredentials: true});
    }
    navigate(`/product/${card._id}`);
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={card.baseImageUrl} alt={card.productName} width="150px" height="150px" />
      <p>{card.productName.split("").slice(0, 40  ).join("")+"..."}</p>
      <p>{card.description.split("").slice(0, 50).join("")+"..."}</p>
      <div>
        <p>{card.price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}

export default Home;