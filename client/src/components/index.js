import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams("category")[0];
  const qString = searchParams.get("category");
  const getProducts = async () => {
    try {
      const append = qString ? `?category=${qString}` : "";
      const data = await axios({
        method: "get",
        url: "/products" + append,
      });
      setProducts(data.data);
    } catch (err) {
      console.log("FAILED TO FETCH DATA");
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getProducts();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <h1>
        {qString
          ? qString.charAt(0).toUpperCase() + qString.slice(1)
          : "Products"}{" "}
        List
      </h1>
      <ul>
        {products.map((product, idx) => (
          <li key={idx}>
            {product.name} -{" "}
            <Link to={"/products/" + product._id}>Details</Link>
          </li>
        ))}
      </ul>
      {qString ? (
        <a href="/products">
          All Products
          <br />
        </a>
      ) : null}
      <Link to="/products/new">Create New Product</Link>
    </React.Fragment>
  );
};

export default Index;
