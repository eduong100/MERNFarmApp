const express = require("express");
const app = express();
// const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.json(products);
  } else {
    const products = await Product.find();
    res.json(products);
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ATTEMPTING DELETION");
  const p = await Product.deleteOne({ _id: id });
  console.log(p);
  res.status(200).send("Success!");
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  console.log(product);
  res.status(200).send("Success!");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
