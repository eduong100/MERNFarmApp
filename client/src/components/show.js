import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const Show = ({ navigate }) => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "fruit",
  });
  const { id } = useParams();
  const getProduct = async () => {
    try {
      const data = await axios({
        method: "get",
        url: `/products/${id}`,
      });
      setProduct(data.data);
      console.log("SUCCSESSFUL QUERY", data);
    } catch (err) {
      console.log("FAILED TO FETCH DATA");
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getProduct();
    return () => {
      controller.abort();
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .delete("/products/" + id, { data: { id: id } })
      .then((res) => {
        console.log(res);
        navigate("/products");
      })
      .catch((err) => {
        console.log("FAILED TO DELETE DATA");
        console.log(err);
        navigate("/products");
      });
  };

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <ul>
        <li>Price: {product.price}</li>
        <li>
          Category:{" "}
          <Link to={"/products/?category=" + product.category}>
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Link>
        </li>
      </ul>
      <Link to="/products">Back to All Products</Link>
      <br />
      <Link to={`/products/${id}/edit`}>Edit this Product</Link>
      <form onSubmit={onSubmit}>
        <button>Delete This Entry</button>
      </form>
    </React.Fragment>
  );
};

export default Show;
