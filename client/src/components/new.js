import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const New = ({ categories, navigate }) => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "fruit",
  });

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { ...form };

    await axios({
      method: "post",
      url: "/products",
      data: newProduct,
    })
      .then((res) => {
        navigate("/products");
        console.log("SUCCESFUL POST", res);
      })
      .catch((err) => {
        console.log("FAILED TO POST DATA");
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <h1>Create New Product</h1>
      <form onSubmit={onSubmit}>
        <section>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => updateForm({ name: e.target.value })}
          />
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            placeholder="Price"
            onChange={(e) => updateForm({ price: e.target.value })}
          />
          <select
            name="category"
            id="category"
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
        </section>
        <button>Submit</button>
      </form>
      <Link to="/products">Return to All Products</Link>
    </React.Fragment>
  );
};

export default New;
