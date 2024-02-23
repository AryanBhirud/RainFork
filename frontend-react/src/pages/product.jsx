import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./product.css";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/v1/products/${productId}`
      );
      setProduct(data);
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <h1>{product.productName}</h1>
      <div className="info">
        <div className="left">
          <img src={product.baseImageUrl} alt={product.productName} />
          <div className="flex-container">
            <p>{product.stock}</p>
            <p>{product.price}</p>
          </div>
        </div>
        <div className="right">
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>
      <div className="images">
        {product?.images?.map((image, index) => {
          return <img src={image} key={index}/>;
        })}
      </div>
    </div>
  );
};

export default Product;
