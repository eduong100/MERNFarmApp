import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Edit = ({ categories, navigate }) => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "fruit",
  });
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "fruit",
  });
  const { id } = useParams();
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };
  const getProduct = async () => {
    try {
      const data = await axios({
        method: "get",
        url: `/products/${id}`,
      });
      setProduct(() => {
        return data.data;
      });
      updateForm(data.data);
      console.log("SUCCSESSFUL QUERY", product);
    } catch (err) {
      console.log("FAILED TO FETCH DATA");
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/products/${id}`, form)
      .then((res) => {
        console.log("SUCCESSFUL UPDATE");
        console.log(res);
        navigate(`/products/${id}`);
      })
      .catch((err) => {
        console.log("FAIL");
        console.log(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    getProduct();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <h1>Edit Product</h1>
      <form onSubmit={onSubmit}>
        <section>
          <React.Fragment key={product.name}>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
              placeholder="Name"
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </React.Fragment>
          <React.Fragment key={product.price}>
            <input
              type="number"
              step="0.01"
              name="price"
              defaultValue={product.price}
              id="price"
              placeholder="Price"
              onChange={(e) => updateForm({ price: e.target.value })}
            />
          </React.Fragment>
          <React.Fragment key={product.category}>
            <select
              name="category"
              id="category"
              defaultValue={product.category}
              onChange={(e) => {
                updateForm({ category: e.target.value });
              }}
            >
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </React.Fragment>
        </section>
        <button>Submit</button>
      </form>
      <Link to="/products">Back to All Products</Link>
    </React.Fragment>
  );
};

export default Edit;
